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
    new SuperDrag(superDrag);
    new OpenLinks(superDrag);
})

class SuperDrag {
    constructor(superDrag) {
        this.isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        this._dic = {};
        this.isTextArea = element => element.matches(
            'input[type="email"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="url"], textarea'
        ) && !element.disabled;

        document.addEventListener('dragstart', ev => this.dragstart(ev, superDrag),false);
        document.addEventListener('dragover', ev => this.dragover(ev), false);
        document.addEventListener('drop', ev => this.drop(ev, superDrag), false);
    }

    dragstart(event, superDrag) {
        this._dic.start_time = new Date().getTime();
        this._dic.startX = event.x;
        this._dic.startY = event.y;
    }

    dragover(event) {
        if (event.dataTransfer.types.includes('text/uri-list')) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'link';
        } else if (event.dataTransfer.types.includes('text/plain')) {
            if (!this.isTextArea(event.target)) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'link';
            }
        }
    }

    drop(event, superDrag) {
        let time_collect;
        this._dic.stop_time = new Date().getTime();
        time_collect = parseInt(this._dic.stop_time - this._dic.start_time);
        // console.log(superDrag.superDrag);
        // console.log(time_collect);
        if ((superDrag.superDrag.timeout === 0 || superDrag.superDrag.timeout > time_collect)
            && (!superDrag.superDrag.enableAlt || (superDrag.superDrag.enableAlt && (!event.altKey || (this.isMac && !event.metaKey))))) {
            let items;
            let position_text;
            let position_link;
            let position_img;
            this._dic.endX = event.x;
            this._dic.endY = event.y;
            let moveX = this._dic.endX - this._dic.startX;
            let moveY = this._dic.endY - this._dic.startY;
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
                            this._dic['url'] = keyword
                            this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            this._dic['flag'] = 'openTable';
                            chrome.extension.sendMessage(this._dic);
                        } else if (superDrag.superDrag.link_type[position_link] === 1) {
                            event.preventDefault();
                            this.copyText(keyword);
                        } else if (superDrag.superDrag.link_type[position_link] === 2) {
                            event.preventDefault();
                            this.copyText(doc.links[0].text);
                        } else if (superDrag.superDrag.link_type[position_link] === 3) {
                            event.preventDefault();
                            keyword = doc.links[0].text;
                            if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                            } else {
                                this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                            }
                            this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            this._dic['flag'] = 'openTable';
                            chrome.extension.sendMessage(this._dic);
                        }
                    } else {
                        if (superDrag.superDrag.img_type[position_img] === 0) {
                            event.preventDefault();
                            this._dic['url'] = event.dataTransfer.getData('text/uri-list');
                            this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                            this._dic['flag'] = 'openTable';
                            chrome.extension.sendMessage(this._dic);
                        } else if (superDrag.superDrag.img_type[position_img] === 1) {
                            event.preventDefault();
                            this._dic['url'] = doc.images[0].src;
                            this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                            this._dic['flag'] = 'openTable';
                            chrome.extension.sendMessage(this._dic);
                        } else if (superDrag.superDrag.img_type[position_img] === 2) {
                            event.preventDefault();
                            this.copyImage(doc.images[0].src);
                        } else if (superDrag.superDrag.img_type[position_img] === 3) {
                            event.preventDefault();
                            this.copyText(doc.images[0].src)
                        } else if (superDrag.superDrag.img_type[position_img] === 4) {
                            event.preventDefault();
                            this._dic['url'] = doc.images[0].src;
                            this._dic['flag'] = 'download';
                            try {
                                chrome.extension.sendMessage(this._dic);
                                this.toast("下载图片，处理中……");
                            } catch (err) {
                                this.toast("下载图片失败！");
                            }
                        } else if (superDrag.superDrag.img_type[position_img] === 5) {
                            event.preventDefault();
                            keyword = doc.images[0].src;
                            if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                                this._dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                            } else {
                                this._dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                            }
                            this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                            this._dic['flag'] = 'openTable';
                            chrome.extension.sendMessage(this._dic);
                        }
                    }
                } else if (doc.links.length) { //链接
                    if (superDrag.superDrag.link_type[position_link] === 0) {
                        event.preventDefault();
                        this._dic['url'] = keyword
                        this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    } else if (superDrag.superDrag.link_type[position_link] === 1) {
                        event.preventDefault();
                        this.copyText(keyword);
                    } else if (superDrag.superDrag.link_type[position_link] === 2) {
                        event.preventDefault();
                        this.copyText(doc.links[0].text);
                    } else if (superDrag.superDrag.link_type[position_link] === 3) {
                        event.preventDefault();
                        keyword = doc.links[0].text;
                        if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                            this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    }
                } else if (doc.images.length) {//图片
                    if (superDrag.superDrag.img_type[position_img] === 0) {
                        event.preventDefault();
                        this._dic['url'] = event.dataTransfer.getData('text/uri-list');
                        this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    } else if (superDrag.superDrag.img_type[position_img] === 1) {
                        event.preventDefault();
                        this._dic['url'] = doc.images[0].src;
                        this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    } else if (superDrag.superDrag.img_type[position_img] === 2) {
                        event.preventDefault();
                        this.copyImage(doc.images[0].src);
                    } else if (superDrag.superDrag.img_type[position_img] === 3) {
                        event.preventDefault();
                        this.copyText(doc.images[0].src)
                    } else if (superDrag.superDrag.img_type[position_img] === 4) {
                        event.preventDefault();
                        this._dic['url'] = doc.images[0].src;
                        this._dic['flag'] = 'download';
                        this._dic['saveAs'] = superDrag.superDrag.saveAs;
                        try {
                            chrome.extension.sendMessage(this._dic);
                            this.toast("下载图片，处理中……");
                        } catch (err) {
                            this.toast("下载图片失败！");
                        }
                    } else if (superDrag.superDrag.img_type[position_img] === 5) {
                        event.preventDefault();
                        keyword = doc.images[0].src;
                        if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                            this._dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            this._dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    }
                } else {
                    if (superDrag.superDrag.link_type[position_link] === 0 && !this.isTextArea(event.target)) {
                        event.preventDefault();
                        this._dic['url'] = keyword;
                        this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    } else if ((superDrag.superDrag.link_type[position_link] === 1 || superDrag.superDrag.link_type[position_link] === 2) && !this.isTextArea(event.target)) {
                        event.preventDefault();
                        this.copyText(keyword);
                    } else if (superDrag.superDrag.link_type[position_link] === 3 && !this.isTextArea(event.target)) {
                        event.preventDefault();
                        if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                            this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                        this._dic['flag'] = 'openTable';
                        chrome.extension.sendMessage(this._dic);
                    }
                }
            } else if (urlPattern.test(keyword)) {
                if (superDrag.superDrag.link_type[position_link] === 0 && !this.isTextArea(event.target)) {
                    event.preventDefault();
                    keyword = "https://" + keyword;
                    this._dic['url'] = keyword;
                    this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                    this._dic['flag'] = 'openTable';
                    chrome.extension.sendMessage(this._dic);
                } else if ((superDrag.superDrag.link_type[position_link] === 1 || superDrag.superDrag.link_type[position_link] === 2) && !this.isTextArea(event.target)) {
                    event.preventDefault();
                    this.copyText(keyword);
                } else if (superDrag.superDrag.link_type[position_link] === 3 && !this.isTextArea(event.target)) {
                    event.preventDefault();
                    if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                        this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                    } else {
                        this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                    }
                    this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                    this._dic['flag'] = 'openTable';
                    chrome.extension.sendMessage(this._dic);
                }
            } else if (event.dataTransfer.types.includes('text/plain')) {
                if (superDrag.superDrag.text_type[position_text] === 0 && !this.isTextArea(event.target)) {
                    event.preventDefault();
                    if (superDrag.superDrag.searchEngines[position_text].url) {
                        this._dic['url'] = superDrag.superDrag.searchEngines[position_text].url.replace(/%s/gi, encodeURIComponent(keyword));
                    } else {
                        this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.searchEngines[position_text]].url.replace(/%s/gi, encodeURIComponent(keyword));
                    }
                    this._dic['active'] = superDrag.superDrag.open_type[position_text] === 0;
                    this._dic['flag'] = 'openTable';
                    chrome.extension.sendMessage(this._dic);
                } else if (superDrag.superDrag.text_type[position_text] === 1 && !this.isTextArea(event.target)) {
                    event.preventDefault();
                    this.copyText(keyword)
                }
            }
        }
        this.clear_up();
    }

    clear_up() {
        this._dic = {};
        document.removeEventListener('dragstart', this.constructor, false);
        document.removeEventListener('dragover', this.constructor, false);
        document.removeEventListener('drop', this.constructor, false);
    }

    // toast提示信息
    toast(msg, duration) {
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }

    // 复制文本
    copyText(word) {
        // navigator.clipboard.writeText(word)
        //     .then(() => {
        //         console.log('Text copied to clipboard');
        //     })
        //     .catch(err => {
        //         // This can happen if the user denies clipboard permissions:
        //         console.error('Could not copy text: ', err);
        //     });
        if (typeof (navigator.clipboard) == 'undefined') {
            console.log('navigator.clipboard');
            var textArea = document.createElement("textarea");
            textArea.value = word;
            textArea.style.position = "fixed";  //avoid scrolling to bottom
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
        navigator.clipboard.writeText(word).then(function () {
            console.log(`successful!`);
        }, function (err) {
            console.warn('unsuccessful!', err);
        });
    }

// 复制图片
    async copyImage(url) {
        try {
            const data = await fetch(url);
            const blob = await data.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            console.log('Image copied.');
        } catch (err) {
            console.error(err.name, err.message);
        }
    }
}

// Reference from linkclump: https://github.com/benblack86/linkclump/blob/master/src/linkclump.js
class OpenLinks {
    constructor(superDrag) {
        this.setting = superDrag;
        this.mouseOn = false;
        this.smart_select = false;
        this.keyCode = null;
        document.addEventListener('keydown', ev => this.keydown(ev), false);
        document.addEventListener('keyup', ev => this.keyup(ev), false);
        document.addEventListener('mousedown', ev => this.mousedown(ev), false);
    }

    keydown(ev){
        this.keyCode = ev.key;
    }

    keyup(ev) {
        this.keyCode = null;
    }

    mousedown(event) {
        if (this.keyCode) {
            if (event.buttons === 1 && this.keyCode.toUpperCase() == this.setting.superDrag.keyCode.toUpperCase()) {
                this.page_links = document.links;
                this.links = this.links_handle();
                this.open_links = [];

                this.clearEventBubble(event);
                // 创建选框
                this.box = document.createElement("span");
                this.box.style.margin = "0px auto";
                this.box.style.border = "2px dashed #516F9C";
                this.box.style.position = "absolute";
                this.box.style.visibility = "visible";
                this.box.x = event.pageX;
                this.box.y = event.pageY;

                this.count_label = document.createElement("span");
                this.count_label.style.position = "absolute";
                this.count_label.style.visibility = "visible";
                this.count_label.style.fontSize = "10px";
                this.count_label.style.font = "Arial, sans-serif";
                this.count_label.style.color = "#516F9C";
                this.count_label.style.border = "2px dashed #516F9C";

                document.body.appendChild(this.box);
                document.body.appendChild(this.count_label);

                this.mouseOn = true;

                this.update_box(event.pageX, event.pageY);

                document.addEventListener('mousemove', ev => this.mousemove(ev, event), false);
                document.addEventListener('mouseup', ev => this.mouseup(ev, event), false);
            }
        }
    }

    mousemove(e, event) {
        if (!this.mouseOn || !this.keyCode) {
            this.clear_up();
            this.clearEventBubble(event);
            return
        }
        this.clearEventBubble(event);
        this.update_box(e.pageX, e.pageY);
        this.highlight_link();
    }

    mouseup(e, event) {
        var _dic = {}
        if (!this.mouseOn || !this.keyCode) {
            this.clear_up();
            this.clearEventBubble(event);
            return
        }
        this.update_box(e.pageX, e.pageY);

        _dic['url'] = this.open_links;
        _dic['active'] = this.setting.superDrag.openLinksOpenType == 0;
        _dic['flag'] = 'openTable';
        chrome.extension.sendMessage(_dic);

        this.highlight_link();
        this.clear_up();
        this.clearEventBubble(event);
    }

    update_box(x, y) {
        var width = Math.max(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]); // taken from jquery
        var height = Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]); // taken from jquery
        x = Math.min(x, width - 7);
        y = Math.min(y, height - 7);

        if (x > this.box.x) {
            this.box.x1 = this.box.x;
            this.box.x2 = x;
        } else {
            this.box.x1 = x;
            this.box.x2 = this.box.x;
        }
        if (y > this.box.y) {
            this.box.y1 = this.box.y;
            this.box.y2 = y;
        } else {
            this.box.y1 = y;
            this.box.y2 = this.box.y;
        }

        this.box.style.left = this.box.x1 + "px";
        this.box.style.width = this.box.x2 - this.box.x1 + "px";
        this.box.style.top = this.box.y1 + "px";
        this.box.style.height = this.box.y2 - this.box.y1 + "px";

        this.count_label.style.left = this.box.x2 + 2 + "px";
        this.count_label.style.top = this.box.y1 + "px";
    }

    links_handle() {
        var links = [];
        // create RegExp once
        var re1 = new RegExp("^javascript:", "i");
        var re2 = new RegExp("^H\\d$");

        for (var i = 0; i < this.page_links.length; i++) {
            // reject javascript: links
            if (re1.test(this.page_links[i].href)) {
                continue;
            }

            // reject href="" or href="#"
            if (!this.page_links[i].getAttribute("href") || this.page_links[i].getAttribute("href") === "#") {
                continue;
            }

            // attempt to ignore invisible links (can't ignore overflow)
            var comp = window.getComputedStyle(this.page_links[i], null);
            if (comp.visibility == "hidden" || comp.display == "none") {
                continue;
            }

            var pos = this.getXY(this.page_links[i]);
            var width = this.page_links[i].offsetWidth;
            var height = this.page_links[i].offsetHeight;

            // attempt to get the actual size of the link
            for (var k = 0; k < this.page_links[i].childNodes.length; k++) {
                if (this.page_links[i].childNodes[k].nodeName == "IMG") {
                    const pos2 = this.getXY(this.page_links[i].childNodes[k]);
                    if (pos.y >= pos2.y) {
                        pos.y = pos2.y;

                        width = Math.max(width, this.page_links[i].childNodes[k].offsetWidth);
                        height = Math.max(height, this.page_links[i].childNodes[k].offsetHeight);
                    }
                }
            }

            this.page_links[i].x1 = pos.x;
            this.page_links[i].y1 = pos.y;
            this.page_links[i].x2 = pos.x + width;
            this.page_links[i].y2 = pos.y + height;
            this.page_links[i].height = height;
            this.page_links[i].width = width;
            this.page_links[i].box = null;
            this.page_links[i].important = this.page_links[i].parentNode != null && re2.test(this.page_links[i].parentNode.nodeName);

            links.push(this.page_links[i]);
        }
        return links
    }

    highlight_link() {
        this.open_links = [];
        for (var i = 0; i < this.links.length; i++) {
            if ((!this.smart_select || this.links[i].important) && !(this.links[i].x1 > this.box.x2 || this.links[i].x2 < this.box.x1 || this.links[i].y1 > this.box.y2 || this.links[i].y2 < this.box.y1)) {
                this.open_links.push({
                    "url": this.links[i].href,
                    "title": this.links[i].innerText
                });

                if (!this.smart_select) {
                    if (this.links[i].important) {
                        this.smart_select = true;
                    }
                }

                if (this.links[i].box === null) {
                    var link_box = document.createElement("span");
                    link_box.style.margin = "0px auto";
                    link_box.style.border = "1px dashed #516F9C";
                    link_box.style.position = "absolute";
                    link_box.style.width = this.links[i].width + "px";
                    link_box.style.height = this.links[i].height + "px";
                    link_box.style.top = this.links[i].y1 + "px";
                    link_box.style.left = this.links[i].x1 + "px";

                    document.body.appendChild(link_box);
                    this.links[i].box = link_box;
                } else {
                    this.links[i].box.style.visibility = "visible";
                }
            } else {
                if (this.links[i].box !== null) {
                    this.links[i].box.style.visibility = "hidden";
                }
            }
        }

        if (this.smart_select && this.open_links.length == 0) {
            this.smart_select = false;
        }

        this.count_label.innerText =  "Num:" + this.open_links.length;
    }

    getXY(element) {
        var x = 0;
        var y = 0;

        var parent = element;
        var style;
        var matrix;
        do {
            style = window.getComputedStyle(parent);
            matrix = new WebKitCSSMatrix(style.webkitTransform);
            x += parent.offsetLeft + matrix.m41;
            y += parent.offsetTop + matrix.m42;
        } while (parent = parent.offsetParent);

        parent = element;
        while (parent && parent !== document.body) {
            if (parent.scrollleft) {
                x -= parent.scrollLeft;
            }
            if (parent.scrollTop) {
                y -= parent.scrollTop;
            }
            parent = parent.parentNode;
        }

        return {
            x: x,
            y: y
        };
    }


    clearEventBubble(e) {
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
    }

    clear_up() {
        if (this.box != null) {
            this.box.style.visibility = 'hidden';
        }
        if (this.count_label != null) {
            this.count_label.style.visibility = 'hidden';
        }

        document.removeEventListener('mousedown', this.constructor, false);
        document.removeEventListener('mousemove', this.mousedown, false);
        document.removeEventListener('mouseup', this.mousedown, false);
        document.removeEventListener('keyup', this.constructor, false);
        document.removeEventListener('keydown', this.constructor, false);

        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].box !== null) {
                document.body.removeChild(this.links[i].box);
                this.links[i].box = null;
            }
        }
        this.open_links = [];
        this.mouseOn = false;
        this.smart_select = false;
    }
}
