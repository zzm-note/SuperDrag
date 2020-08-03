chrome.storage.sync.get({superDrag: _getDefault()}, function (superDrag) {
    // if (superDrag.superDrag.effect_link === 1 && superDrag.superDrag.linkTextSelect) {
    //     // The original code is copyrighted by Griever and licensed under the MIT license.
    //     class LinkDragSelection {
    //         constructor() {
    //             this.init(...arguments);
    //         }
    //
    //         init(event) {
    //             this.moved_flag = false;
    //             this.range = document.caretRangeFromPoint(event.clientX, event.clientY);
    //             const sel = getSelection();
    //             if (!sel.isCollapsed &&
    //                 sel.getRangeAt(0).isPointInRange(this.range.startContainer, this.range.startOffset)) {
    //                 return;
    //             }
    //             this.screenX = event.screenX;
    //             this.screenY = event.screenY;
    //             document.addEventListener('mousemove', this, false);
    //             document.addEventListener('mouseup', this, false);
    //         }
    //
    //         uninit() {
    //             this.moved_flag = false;
    //             document.removeEventListener('mousemove', this, false);
    //             document.removeEventListener('mouseup', this, false);
    //             document.removeEventListener('dragstart', this, false);
    //             setTimeout(() => {
    //                 document.removeEventListener('click', this, false);
    //             }, 10);
    //         }
    //
    //         handleEvent(event) {
    //             switch (event.type) {
    //                 case 'mousemove':
    //                     if (this.moved_flag) {
    //                         const range = document.caretRangeFromPoint(event.clientX, event.clientY);
    //                         if (range) {
    //                             getSelection().extend(range.startContainer, range.startOffset);
    //                         }
    //                     } else {
    //                         this.moveX = event.screenX;
    //                         this.moveY = event.screenY;
    //                         this.checkXY();
    //                     }
    //                     break;
    //                 case 'mouseup':
    //                     this.uninit();
    //                     break;
    //                 case 'dragstart':
    //                     event.currentTarget.removeEventListener(event.type, this, false);
    //                     if (this.moved_flag) {
    //                         event.preventDefault();
    //                         // event.stopPropagation();
    //                     } else {
    //                         this.checkXY();
    //                     }
    //                     break;
    //                 case 'click':
    //                     event.currentTarget.removeEventListener(event.type, this, false);
    //                     if (!getSelection().isCollapsed) {
    //                         event.preventDefault();
    //                         // event.stopPropagation();
    //                     }
    //                     break;
    //             }
    //         }
    //
    //         selectionStart() {
    //             this.moved_flag = true;
    //             getSelection().collapse(this.range.startContainer, this.range.startOffset);
    //             document.addEventListener('dragstart', this, false);
    //             document.addEventListener('click', this, false);
    //         }
    //
    //         checkXY() {
    //             const x = Math.abs(this.screenX - this.moveX);
    //             const y = Math.abs(this.screenY - this.moveY);
    //             if (x > y) {
    //                 this.selectionStart();
    //             }
    //             if (x >= 4 || y >= 4) {
    //                 this.uninit();
    //             }
    //         }
    //     }
    //
    //     document.addEventListener('mousedown', event => {
    //         if (event.button === 0 && !event.altKey && event.target.matches('a[href], a[href] *')) {
    //             new LinkDragSelection(event);
    //         }
    //     }, false);
    // }

    // toast提示信息
    function toast(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() {
            document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }

    // 复制文本
    function copyText(word) {
        // navigator.clipboard.writeText(word)
        //     .then(() => {
        //         console.log('Text copied to clipboard');
        //     })
        //     .catch(err => {
        //         // This can happen if the user denies clipboard permissions:
        //         console.error('Could not copy text: ', err);
        //     });
        if (typeof(navigator.clipboard)=='undefined') {
            console.log('navigator.clipboard');
            var textArea = document.createElement("textarea");
            textArea.value = word;
            textArea.style.position="fixed";  //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log(msg); 
            } catch (err) {
                console.warn('Was not possible to copy te text: ', err);
            }
        
            document.body.removeChild(textArea)            
            return;
        }
        navigator.clipboard.writeText(word).then(function() {
            console.log(`successful!`);         
        }, function(err) {
            console.warn('unsuccessful!', err);
        });
    }

    // 复制图片
    async function copyImage(url) {
        try {
            const data = await fetch(url);
            const blob = await data.blob();
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob
              })
            ]);
            console.log('Image copied.');
          } catch(err) {
            console.error(err.name, err.message);
          }
    }

    const isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    const _dic = {};
    const isTextArea = element => element.matches(
        'input[type="email"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="url"], textarea'
    ) && !element.disabled;
    document.addEventListener('dragstart', event => {
        _dic.start_time = new Date().getTime();
        _dic.startX = event.x;
        _dic.startY = event.y;
    }, false);
    document.addEventListener('dragover', event => {
        if (event.dataTransfer.types.includes('text/uri-list')) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'link';
        } else if (event.dataTransfer.types.includes('text/plain')) {
            if (!isTextArea(event.target)) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'link';
            }
        }
    }, false);
    document.addEventListener('drop', event => {
        _dic.stop_time = new Date().getTime();
        time_collect = parseInt(_dic.stop_time - _dic.start_time);
        if ((superDrag.superDrag.timeout === 0 || superDrag.superDrag.timeout > time_collect)
            && (!superDrag.superDrag.enableAlt || (superDrag.superDrag.enableAlt && (!event.altKey || (isMac && !event.metaKey))))){
            let items;
            let position_text;
            let position_link;
            let position_img;
            _dic.endX = event.x;
            _dic.endY = event.y;
            let moveX = _dic.endX - _dic.startX;
            let moveY = _dic.endY - _dic.startY;
            if (superDrag.superDrag.effect_text === 0) {
                if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                    position_text = 0;
                } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                    position_text = 1;
                } else if (Math.abs(moveY) < Math.abs(moveX) && moveX < 0) {
                    position_text = 2;
                } else {
                    position_text = 3;
                }
            } else if (superDrag.superDrag.effect_text === 1) {
                if (moveY < 0) {
                    position_text = 0;
                } else {
                    position_text = 1;
                }
            } else if (superDrag.superDrag.effect_text === 2) {
                if (moveX < 0) {
                    position_text = 2;
                } else {
                    position_text = 3;
                }
            }
            if (superDrag.superDrag.effect_link === 0) {
                if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                    position_link = 0;
                } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                    position_link = 1;
                } else if (Math.abs(moveY) < Math.abs(moveX) && moveX < 0) {
                    position_link = 2;
                } else {
                    position_link = 3;
                }
            } else if (superDrag.superDrag.effect_link === 1) {
                if (moveY < 0) {
                    position_link = 0;
                } else {
                    position_link = 1;
                }
            } else if (superDrag.superDrag.effect_link === 2) {
                if (moveX < 0) {
                    position_link = 2;
                } else {
                    position_link = 3;
                }
            }
            if (superDrag.superDrag.effect_img === 0) {
                if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                    position_img = 0;
                } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                    position_img = 1;
                } else if (Math.abs(moveY) < Math.abs(moveX) && moveX < 0) {
                    position_img = 2;
                } else {
                    position_img = 3;
                }
            } else if (superDrag.superDrag.effect_img === 1) {
                if (moveY < 0) {
                    position_img = 0;
                } else {
                    position_img = 1;
                }
            } else if (superDrag.superDrag.effect_img === 2) {
                if (moveX < 0) {
                    position_img = 2;
                } else {
                    position_img = 3;
                }
            }
            let keyword = event.dataTransfer.getData('text/plain').trim();
            let urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

            if (event.dataTransfer.types.includes('text/uri-list')) {
                items = event.dataTransfer.getData('text/html');
                let domparser = new DOMParser();
                let doc = domparser.parseFromString(items, 'text/html');

                // console.log(doc.links);
                // console.log(doc.images);
                
                if (doc.links.length && doc.images.length) { //如果链接包含图片
                    if (superDrag.superDrag.firstEvent) {
                        if (superDrag.superDrag.link_type[position_link] === 0) {
                            event.preventDefault();
                            _dic['url'] = keyword
                            _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            _dic['flag'] = 'openTable';
                            chrome.runtime.sendMessage(_dic);
                        } else if (superDrag.superDrag.link_type[position_link] === 1) {
                            event.preventDefault();
                            copyText(keyword);
                        } else if (superDrag.superDrag.link_type[position_link] === 2) {
                            event.preventDefault();
                            copyText(doc.links[0].text);
                        } else if (superDrag.superDrag.link_type[position_link] === 3) {
                            event.preventDefault();
                            keyword = doc.links[0].text;
                            if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                _dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                            } else {
                                _dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                            }
                            _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            _dic['flag'] = 'openTable';
                            chrome.runtime.sendMessage(_dic);
                        }
                    } else {
                        if (superDrag.superDrag.img_type[position_img] === 0) {
                            event.preventDefault();
                            _dic['url'] = event.dataTransfer.getData('text/uri-list');
                            _dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                            _dic['flag'] = 'openTable';
                            chrome.runtime.sendMessage(_dic);
                        } else if (superDrag.superDrag.img_type[position_img] === 1) {
                            event.preventDefault();
                            _dic['url'] = doc.images[0].src;
                            _dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                            _dic['flag'] = 'openTable';
                            chrome.runtime.sendMessage(_dic);
                        } else if (superDrag.superDrag.img_type[position_img] === 2) {
                            event.preventDefault();
                            copyImage(doc.images[0].src);
                        } else if (superDrag.superDrag.img_type[position_img] === 3) {
                            event.preventDefault();
                            copyText(doc.images[0].src)
                        } else if (superDrag.superDrag.img_type[position_img] === 4) {
                            event.preventDefault();
                            _dic['url'] = doc.images[0].src;
                            _dic['flag'] = 'download';
                            try {
                                chrome.runtime.sendMessage(_dic);
                                toast("下载图片，处理中……");
                              } catch(err) {
                                toast("下载图片失败！");
                              }
                        } else if (superDrag.superDrag.img_type[position_img] === 5) {
                            event.preventDefault();
                            keyword = doc.images[0].src;
                            if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                                _dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                            } else {
                                _dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                            }
                            _dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                            _dic['flag'] = 'openTable';
                            chrome.runtime.sendMessage(_dic);
                        }
                    }
                } else if (doc.links.length) { //链接
                    if (superDrag.superDrag.link_type[position_link] === 0) {
                        event.preventDefault();
                        _dic['url'] = keyword
                        _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    } else if (superDrag.superDrag.link_type[position_link] === 1) {
                        event.preventDefault();
                        copyText(keyword);
                    } else if (superDrag.superDrag.link_type[position_link] === 2) {
                        event.preventDefault();
                        copyText(doc.links[0].text);
                    } else if (superDrag.superDrag.link_type[position_link] === 3) {
                        event.preventDefault();
                        keyword = doc.links[0].text;
                        if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                            _dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            _dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    }
                } else if (doc.images.length) {//图片
                    if (superDrag.superDrag.img_type[position_img] === 0) {
                        event.preventDefault();
                        _dic['url'] = event.dataTransfer.getData('text/uri-list');
                        _dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    } else if (superDrag.superDrag.img_type[position_img] === 1) {
                        event.preventDefault();
                        _dic['url'] = doc.images[0].src;
                        _dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    } else if (superDrag.superDrag.img_type[position_img] === 2) {
                        event.preventDefault();
                        copyImage(doc.images[0].src);
                    } else if (superDrag.superDrag.img_type[position_img] === 3) {
                        event.preventDefault();
                        copyText(doc.images[0].src)
                    } else if (superDrag.superDrag.img_type[position_img] === 4) {
                        event.preventDefault();
                        _dic['url'] = doc.images[0].src;
                        _dic['flag'] = 'download';
                        try {
                            chrome.runtime.sendMessage(_dic);
                            toast("下载图片，处理中……");
                          } catch(err) {
                            toast("下载图片失败！");
                          }
                    } else if (superDrag.superDrag.img_type[position_img] === 5) {
                        event.preventDefault();
                        keyword = doc.images[0].src;
                        if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                            _dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            _dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        _dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    }
                }
                else {
                    if (superDrag.superDrag.link_type[position_link] === 0 && !isTextArea(event.target)) {
                        event.preventDefault();
                        _dic['url'] = keyword;
                        _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    } else if ((superDrag.superDrag.link_type[position_link] === 1 || superDrag.superDrag.link_type[position_link] === 2) && !isTextArea(event.target)) {
                        event.preventDefault();
                        copyText(keyword);
                    } else if (superDrag.superDrag.link_type[position_link] === 3 && !isTextArea(event.target)) {
                        event.preventDefault();
                        if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                            _dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            _dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        _dic['flag'] = 'openTable';
                        chrome.runtime.sendMessage(_dic);
                    }
                }
            } else if (urlPattern.test(keyword)) {
                if (superDrag.superDrag.link_type[position_link] === 0 && !isTextArea(event.target)) {
                    event.preventDefault();
                    keyword = "https://" + keyword;
                    _dic['url'] = keyword;
                    _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                    _dic['flag'] = 'openTable';
                    chrome.runtime.sendMessage(_dic);
                } else if ((superDrag.superDrag.link_type[position_link] === 1 || superDrag.superDrag.link_type[position_link] === 2) && !isTextArea(event.target)) {
                    event.preventDefault();
                    copyText(keyword);
                } else if (superDrag.superDrag.link_type[position_link] === 3 && !isTextArea(event.target)) {
                    event.preventDefault();
                    if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                        _dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                    } else {
                        _dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                    }
                    _dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                    _dic['flag'] = 'openTable';
                    chrome.runtime.sendMessage(_dic);
                }
            } else if (event.dataTransfer.types.includes('text/plain')) {
                if (superDrag.superDrag.text_type[position_text] === 0 && !isTextArea(event.target)) {
                    event.preventDefault();
                    if (superDrag.superDrag.searchEngines[position_text].url) {
                        _dic['url'] = superDrag.superDrag.searchEngines[position_text].url.replace(/%s/gi, encodeURIComponent(keyword));
                    } else {
                        _dic['url'] = _build_in_seach_engines[superDrag.superDrag.searchEngines[position_text]].url.replace(/%s/gi, encodeURIComponent(keyword));
                    }
                    _dic['active'] = superDrag.superDrag.open_type[position_text] === 0;
                    _dic['flag'] = 'openTable';
                    chrome.runtime.sendMessage(_dic);
                } else if (superDrag.superDrag.text_type[position_text] === 1 && !isTextArea(event.target)) {
                    event.preventDefault();
                    copyText(keyword)
                }
            }
        }
    }, false);
})
