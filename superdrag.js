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
    document.addEventListener('dragstart', event => {
        new SuperDrag(event, superDrag);
    }, false)
    document.addEventListener('mousedown', event => {
        if (event.shiftKey){
            new OpenLinks(event, superDrag);
        }
    }, false);
})

class SuperDrag{
    constructor(event, superDrag) {
        this.isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        this._dic = {};
        this.isTextArea = element => element.matches(
            'input[type="email"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="url"], textarea'
        ) && !element.disabled;

        this.drag(event, superDrag);
    }
    // toast提示信息
    toast(msg, duration) {
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
    copyText(word) {
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
        } catch(err) {
            console.error(err.name, err.message);
        }
    }

    drag(event, superDrag){
        let time_collect = 0;

        this._dic.start_time = new Date().getTime();
        this._dic.startX = event.x;
        this._dic.startY = event.y;
        document.addEventListener('dragover', event => {
            if (event.dataTransfer.types.includes('text/uri-list')) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'link';
            } else if (event.dataTransfer.types.includes('text/plain')) {
                if (!this.isTextArea(event.target)) {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'link';
                }
            }
        }, false);
        document.addEventListener('drop', event => {
            this._dic.stop_time = new Date().getTime();
            time_collect = parseInt(this._dic.stop_time - this._dic.start_time);
            if ((superDrag.superDrag.timeout === 0 || superDrag.superDrag.timeout > time_collect)
                && (!superDrag.superDrag.enableAlt || (superDrag.superDrag.enableAlt && (!event.altKey || (this.isMac && !event.metaKey))))){
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
                                    toast("下载图片，处理中……");
                                } catch(err) {
                                    toast("下载图片失败！");
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
                                toast("下载图片，处理中……");
                            } catch(err) {
                                toast("下载图片失败！");
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
                    else {
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
        }, false);
        document.addEventListener('mouseup', this.clear_up, false);
    }

    clear_up() {
        document.removeEventListener('dragstart', this, true);
        document.removeEventListener('dragover', this.drag, false);
        document.removeEventListener('drop', this.drag, false);
        document.removeEventListener('mouseup', this.drag, false);
    }
}

class OpenLinks {
    constructor(event, superDrag) {
        this.mouseOn = false;
        this.startX = 0;
        this.startY = 0;

        this.links = document.links;
        this.box_local = {};

        this.clearEventBubble(event);
        if (event.buttons === 1 && event.shiftKey) {
            this.box = document.createElement("span");
            this.box.style.margin = "0px auto";
            this.box.style.border = "2px dotted #00FF00";
            this.box.style.position = "absolute";
            this.box.style.zIndex = 2147483647;
            this.box.style.visibility = "visible";
            this.box.x = event.pageX;
            this.box.y = event.pageY;

            document.body.appendChild(this.box);

            this.mouseOn = true

            this.update_box(event.pageX, event.pageY, true)

            document.addEventListener('mousemove', ev => this.mousemove(ev), false);
            document.addEventListener('mouseup', ev => this.mouseup(ev), false);
        }
    }

    update_box(x, y, first) {
        if (first) {
            this.box.style.left = x + "px";
            this.box.style.width = "0px";
            this.box.style.top = y + "px";
            this.box.style.height = "0px";
        } else {
            const width = Math.abs(x - this.box.style.left.substr(0, this.box.style.left.length-2))
            const height = Math.abs(y - this.box.style.top.substr(0, this.box.style.top.length-2))
            this.box.style.width = width + "px";
            this.box.style.height = height + "px";
        }
    }

    mousemove(e) {
        if (!this.mouseOn || !e.shiftKey) return;
        this.clearEventBubble(e);
        this.update_box(e.pageX, e.pageY, false);
    }

    mouseup(e) {
        if (!this.mouseOn || !e.shiftKey) return;
        this.update_box(e.pageX, e.pageY, false);
        this.box.style.visibility = "hidden";
        this.mouseOn = false;
        this.clear_up();
        this.clearEventBubble(e);
        // 打印被选中DOM元素
        console.log(e.pageX)
        console.log(e.pageY)
        console.log(this.box.style.left);
        console.log(this.box.style.top);
        console.log(this.box.style.width);
        console.log(this.box.style.height);
        this.box_local = {x: this.box.style.left, y: this.box.style.top, L: this.box.style.width, H: this.box.style.height}
        debugger
    }

    links_handle(e) {

    }

    clearEventBubble = function(e) {
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;

        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
    }

    clear_up = function () {
        document.removeEventListener('mousemove', OpenLinks.constructor, false);
        document.removeEventListener('mouseup', OpenLinks.constructor, false);
    }
}
