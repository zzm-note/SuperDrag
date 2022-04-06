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
    $().ready(function() {
        for (let link of document.links) {
            if (link.draggable === false && link.offsetHeight != 0 && link.offsetWidth != 0) {
                link.draggable = true;
            }
            for (let sub_link of link.childNodes) {
                if (sub_link.draggable === false && sub_link.offsetHeight != 0 && sub_link.offsetWidth != 0) {
                    sub_link.draggable = true;
                }
            }
        }
    });
    $(window).on('scroll', function(){  //监听滚动事件
        for (let link of document.links) {
            if (link.draggable === false && link.offsetHeight != 0 && link.offsetWidth != 0) {
                link.draggable = true;
            }
            for (let sub_link of link.childNodes) {
                if (sub_link.draggable === false && sub_link.offsetHeight != 0 && sub_link.offsetWidth != 0) {
                    sub_link.draggable = true;
                }
            }
        }
    });
})

class SuperDrag {
    constructor(superDrag) {
        this.isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        this._dic = {};
        this.handle_type = null;
        this.dragEvent = null;
        this.notice = null;
        this.containsImg = null;
        this.dragInBox = false;
        this.currentDragDirection = null;
        this.toCancel = false;
        this.arrow = [['⇖','⇙','⇗','⇘'], ['⇑','⇓','⇐','⇒']]

        document.addEventListener('dragstart', ev => this.dragstart(ev, superDrag), false);
        document.addEventListener('dragover', ev => this.dragover(ev, superDrag), false);
        document.addEventListener('dragend', ev => this.dragend(ev, superDrag), false);
    }

    dragstart(event, superDrag) {
        this._dic.start_time = new Date().getTime();
        this._dic.startX = event.x;
        this._dic.startY = event.y;
        this.dragEvent = event;
    }

    dragover(event, superDrag) {
        if (!this.notice) {
            this.notice = document.createElement('div');
            this.notice.id = "notice-superDrag" + this._dic.start_time;
            this.notice.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            if (superDrag.superDrag.showNotice && (["A", "IMG", "#text"].indexOf(this.dragEvent.srcElement.nodeName) != -1 || ["A"].indexOf(this.dragEvent.srcElement.parentNode.nodeName) != -1)) {
                document.body.appendChild(this.notice);
            }
        }
        let time_collect;
        this._dic.stop_time = new Date().getTime();
        time_collect = parseInt(this._dic.stop_time - this._dic.start_time);
        // console.log(superDrag.superDrag);
        // console.log(time_collect);
        if (superDrag.superDrag.timeout !== 0 && superDrag.superDrag.timeout < time_collect) {
            this._dic.timeout = true;
        }
        if (superDrag.superDrag.enableAlt && (event.altKey || (this.isMac && event.metaKey))) {
            this.toCancel = true;
        }
        if (event.button==0&&event.target.tagName&&((event.target.tagName.toLowerCase()=="input"&&event.target.type=="text")||event.target.tagName.toLowerCase()=="textarea")) {
            this.dragInBox = true
        } else {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'link';
            this.dragInBox = false
        }
        if (!this.dragInBox && !this._dic.timeout && !this.toCancel) {
            this.notice.style.display = "";
            let items;
            let position_text;
            let position_link;
            let position_img;
            this._dic.endX = event.x;
            this._dic.endY = event.y;
            let moveX = this._dic.endX - this._dic.startX;
            let moveY = this._dic.endY - this._dic.startY;
            if (superDrag.superDrag.effect_text === 0) {
                if (superDrag.superDrag.direction_sel === 0) {
                    if (moveX < 0 && moveY < 0) {
                        position_text = 0;
                    } else if (moveX < 0 && moveY >= 0) {
                        position_text = 1;
                    } else if (moveX >= 0 && moveY < 0) {
                        position_text = 2;
                    } else {
                        position_text = 3;
                    }
                } else {
                    if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                        position_text = 0;
                    } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                        position_text = 1;
                    } else if (Math.abs(moveY) <= Math.abs(moveX) && moveX < 0) {
                        position_text = 2;
                    } else {
                        position_text = 3;
                    }
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
                if (superDrag.superDrag.direction_sel === 0) {
                    if (moveX < 0 && moveY < 0) {
                        position_link = 0;
                    } else if (moveX < 0 && moveY >= 0) {
                        position_link = 1;
                    } else if (moveX >= 0 && moveY < 0) {
                        position_link = 2;
                    } else {
                        position_link = 3;
                    }
                } else {
                    if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                        position_link = 0;
                    } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                        position_link = 1;
                    } else if (Math.abs(moveY) <= Math.abs(moveX) && moveX < 0) {
                        position_link = 2;
                    } else {
                        position_link = 3;
                    }
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
                if (superDrag.superDrag.direction_sel === 0) {
                    if (moveX < 0 && moveY < 0) {
                        position_img = 0;
                    } else if (moveX < 0 && moveY >= 0) {
                        position_img = 1;
                    } else if (moveX >= 0 && moveY < 0) {
                        position_img = 2;
                    } else {
                        position_img = 3;
                    }
                } else {
                    if (Math.abs(moveY) > Math.abs(moveX) && moveY < 0) {
                        position_img = 0;
                    } else if (Math.abs(moveY) > Math.abs(moveX) && moveY > 0) {
                        position_img = 1;
                    } else if (Math.abs(moveY) <= Math.abs(moveX) && moveX < 0) {
                        position_img = 2;
                    } else {
                        position_img = 3;
                    }
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
            if (this.currentDragDirection != [position_text, position_link, position_img].toString()) {
                this.currentDragDirection = [position_text, position_link, position_img].toString();
                let keyword = window.getSelection().toString().replace(/(^\s*)|(\s*$)/g, "");
                let urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
                if (this.dragEvent.srcElement.localName == "a") {
                    if (!this.containsImg) {
                        this.findImg(this.dragEvent.srcElement.childNodes);
                    }
                    if (this.containsImg) { //如果链接包含图片
                        if (superDrag.superDrag.firstEvent) {
                            if (superDrag.superDrag.link_type[position_link] === 3) {
                                if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + chrome.i18n.getMessage("custom_search");
                                } else {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].name;
                                }
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]];
                            }
                            if (superDrag.superDrag.link_type[position_link] === 0) {
                                this._dic['url'] = this.dragEvent.srcElement.href
                                this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.link_type[position_link] === 1) {
                                this._dic['keywords'] = this.dragEvent.srcElement.href;
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.link_type[position_link] === 2) {
                                if (this.containsImg.alt) {
                                    this._dic['keywords'] = this.containsImg.alt
                                } else {
                                    this._dic['keywords'] = this.containsImg.currentSrc;
                                }
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.link_type[position_link] === 3) {
                                if (this.containsImg.alt) {
                                    keyword = this.containsImg.alt
                                } else {
                                    keyword = this.containsImg.currentSrc;
                                }
                                if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                    this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                                } else {
                                    this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                                }
                                this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.link_type[position_link] === 4) {
                                this._dic['keywords'] = this.dragEvent.srcElement.href;
                                this.handle_type = "qrcode";
                            }
                        } else {
                            if (superDrag.superDrag.img_type[position_img] === 5) {
                                if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]] + " - " + chrome.i18n.getMessage("custom_search");
                                } else {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]] + " - " + _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].name;
                                }
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]];
                            }
                            if (superDrag.superDrag.img_type[position_img] === 0) {
                                this._dic['url'] = this.dragEvent.srcElement.href;
                                this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.img_type[position_img] === 1) {
                                this._dic['url'] = this.containsImg.currentSrc;
                                this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.img_type[position_img] === 2) {
                                this._dic['keywords'] = this.containsImg.currentSrc;
                                this.handle_type = "copyImage";
                            } else if (superDrag.superDrag.img_type[position_img] === 3) {
                                this._dic['keywords'] = this.containsImg.currentSrc;
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.img_type[position_img] === 4) {
                                this._dic['url'] = this.containsImg.currentSrc;
                                this._dic['flag'] = 'download';
                                this._dic['saveAs'] = superDrag.superDrag.saveAs;
                                this.handle_type = "sendMessageDownload";
                            } else if (superDrag.superDrag.img_type[position_img] === 5) {
                                keyword = this.containsImg.currentSrc;
                                if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                                    this._dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                                } else {
                                    this._dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                                }
                                this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            }
                        }
                    } else {
                        if (superDrag.superDrag.link_type[position_link] === 3) {
                            if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + chrome.i18n.getMessage("custom_search");
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].name;
                            }
                        } else {
                            this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]];
                        }
                        if (superDrag.superDrag.link_type[position_link] === 0) {
                            this._dic['url'] = this.dragEvent.srcElement.href;
                            this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            this._dic['flag'] = 'openTable';
                            this.handle_type = "sendMessage";
                        } else if (superDrag.superDrag.link_type[position_link] === 1) {
                            this._dic['keywords'] = this.dragEvent.srcElement.href;
                            this.handle_type = "copyText";
                        } else if (superDrag.superDrag.link_type[position_link] === 2) {
                            this._dic['keywords'] = this.dragEvent.srcElement.innerText;
                            this.handle_type = "copyText";
                        } else if (superDrag.superDrag.link_type[position_link] === 3) {
                            keyword = this.dragEvent.srcElement.innerText;
                            if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                            } else {
                                this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                            }
                            this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            this._dic['flag'] = 'openTable';
                            this.handle_type = "sendMessage";
                        } else if (superDrag.superDrag.link_type[position_link] === 4) {
                            this._dic['keywords'] = this.dragEvent.srcElement.href;
                            this.handle_type = "qrcode";
                        }
                    }
                } else if (this.dragEvent.srcElement.localName == 'img') {
                    if (superDrag.superDrag.img_type[position_img] === 5) {
                        if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                            this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]] + " - " + chrome.i18n.getMessage("custom_search");
                        } else {
                            this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]] + " - " + _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].name;
                        }
                    } else {
                        this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]];
                    }
                    if (superDrag.superDrag.img_type[position_img] === 0) {
                        for(let value of this.dragEvent.path){
                            if (value.localName == 'img') {
                                this._dic['url'] = value.currentSrc;
                            } else if (value.localName == 'a') {
                                this._dic['url'] = value.href;
                                break;
                            }
                        }
                        this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        this._dic['flag'] = 'openTable';
                        this.handle_type = "sendMessage";
                    } else if (superDrag.superDrag.img_type[position_img] === 1) {
                        this._dic['url'] = this.dragEvent.srcElement.currentSrc;
                        this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        this._dic['flag'] = 'openTable';
                        this.handle_type = "sendMessage";
                    } else if (superDrag.superDrag.img_type[position_img] === 2) {
                        this._dic['keywords'] = this.dragEvent.srcElement.currentSrc;
                        this.handle_type = "copyImage";
                    } else if (superDrag.superDrag.img_type[position_img] === 3) {
                        this._dic['keywords'] = this.dragEvent.srcElement.currentSrc;
                        this.handle_type = "copyText";
                    } else if (superDrag.superDrag.img_type[position_img] === 4) {
                        this._dic['url'] = this.dragEvent.srcElement.currentSrc;
                        this._dic['flag'] = 'download';
                        this._dic['saveAs'] = superDrag.superDrag.saveAs;
                        this.handle_type = "sendMessageDownload";
                    } else if (superDrag.superDrag.img_type[position_img] === 5) {
                        keyword = this.dragEvent.srcElement.currentSrc;
                        if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                            this._dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                        } else {
                            this._dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                        }
                        this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                        this._dic['flag'] = 'openTable';
                        this.handle_type = "sendMessage";
                    }
                } else if (["A"].indexOf(this.dragEvent.srcElement.parentNode.nodeName) != -1) {
                    if (!this.containsImg) {
                        this.findImg(this.dragEvent.srcElement.parentNode.childNodes);
                    }
                    if (this.containsImg) { //如果链接包含图片
                        if (superDrag.superDrag.firstEvent) {
                            if (superDrag.superDrag.link_type[position_link] === 3) {
                                if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + chrome.i18n.getMessage("custom_search");
                                } else {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].name;
                                }
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]];
                            }
                            if (superDrag.superDrag.link_type[position_link] === 0) {
                                this._dic['url'] = this.dragEvent.srcElement.parentNode.href
                                this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.link_type[position_link] === 1) {
                                this._dic['keywords'] = this.dragEvent.srcElement.parentNode.href;
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.link_type[position_link] === 2) {
                                if (this.containsImg.alt) {
                                    this._dic['keywords'] = this.containsImg.alt
                                } else {
                                    this._dic['keywords'] = this.containsImg.currentSrc;
                                }
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.link_type[position_link] === 3) {
                                if (this.containsImg.alt) {
                                    keyword = this.containsImg.alt
                                } else {
                                    keyword = this.containsImg.currentSrc;
                                }
                                if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                    this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                                } else {
                                    this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                                }
                                this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.link_type[position_link] === 4) {
                                this._dic['keywords'] = this.dragEvent.srcElement.parentNode.href;
                                this.handle_type = "qrcode";
                            }
                        } else {
                            if (superDrag.superDrag.img_type[position_img] === 5) {
                                if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]] + " - " + chrome.i18n.getMessage("custom_search");
                                } else {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]] + " - " + _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].name;
                                }
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_img] + " 图片 - " + _img_type[superDrag.superDrag.img_type[position_img]];
                            }
                            if (superDrag.superDrag.img_type[position_img] === 0) {
                                this._dic['url'] = this.dragEvent.srcElement.parentNode.href;
                                this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.img_type[position_img] === 1) {
                                this._dic['url'] = this.containsImg.currentSrc;
                                this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.img_type[position_img] === 2) {
                                this._dic['keywords'] = this.containsImg.currentSrc;
                                this.handle_type = "copyImage";
                            } else if (superDrag.superDrag.img_type[position_img] === 3) {
                                this._dic['keywords'] = this.containsImg.currentSrc;
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.img_type[position_img] === 4) {
                                this._dic['url'] = this.containsImg.currentSrc;
                                this._dic['flag'] = 'download';
                                this._dic['saveAs'] = superDrag.superDrag.saveAs;
                                this.handle_type = "sendMessageDownload";
                            } else if (superDrag.superDrag.img_type[position_img] === 5) {
                                keyword = this.containsImg.currentSrc;
                                if (superDrag.superDrag.imgSearchEngines[position_img].url) {
                                    this._dic['url'] = superDrag.superDrag.imgSearchEngines[position_img].url.replace(/%s/gi, encodeURIComponent(keyword));
                                } else {
                                    this._dic['url'] = _build_in_seach_engines_for_img[superDrag.superDrag.imgSearchEngines[position_img]].url.replace(/%s/gi, encodeURIComponent(keyword));
                                }
                                this._dic['active'] = superDrag.superDrag.open_type_img[position_img] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            }
                        }
                    } else {
                        if (superDrag.superDrag.link_type[position_link] === 3) {
                            if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + chrome.i18n.getMessage("custom_search");
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].name;
                            }
                        } else {
                            this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]];
                        }
                        if (superDrag.superDrag.link_type[position_link] === 0) {
                            this._dic['url'] = this.dragEvent.srcElement.parentNode.href;
                            this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            this._dic['flag'] = 'openTable';
                            this.handle_type = "sendMessage";
                        } else if (superDrag.superDrag.link_type[position_link] === 1) {
                            this._dic['keywords'] = this.dragEvent.srcElement.parentNode.href;
                            this.handle_type = "copyText";
                        } else if (superDrag.superDrag.link_type[position_link] === 2) {
                            this._dic['keywords'] = this.dragEvent.srcElement.parentNode.innerText;
                            this.handle_type = "copyText";
                        } else if (superDrag.superDrag.link_type[position_link] === 3) {
                            keyword = this.dragEvent.srcElement.parentNode.innerText;
                            if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                            } else {
                                this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                            }
                            this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                            this._dic['flag'] = 'openTable';
                            this.handle_type = "sendMessage";
                        } else if (superDrag.superDrag.link_type[position_link] === 4) {
                            this._dic['keywords'] = this.dragEvent.srcElement.parentNode.href;
                            this.handle_type = "qrcode";
                        }
                    }
                } else {
                    if (keyword) {
                        if (urlPattern.test(keyword)) {
                            if (superDrag.superDrag.link_type[position_link] === 3) {
                                if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + chrome.i18n.getMessage("custom_search");
                                } else {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]] + " - " + _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].name;
                                }
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_link] + " 链接 - " + _link_type[superDrag.superDrag.link_type[position_link]];
                            }
                            if (superDrag.superDrag.link_type[position_link] === 0) {
                                if (keyword.substr(0, 4) != 'http') {
                                    keyword = "http://" + keyword;
                                }
                                this._dic['url'] = keyword;
                                this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.link_type[position_link] === 1 || superDrag.superDrag.link_type[position_link] === 2) {
                                this._dic['keywords'] = keyword;
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.link_type[position_link] === 3) {
                                if (superDrag.superDrag.linkSearchEngines[position_link].url) {
                                    this._dic['url'] = superDrag.superDrag.linkSearchEngines[position_link].url.replace(/%s/gi, encodeURIComponent(keyword));
                                } else {
                                    this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.linkSearchEngines[position_link]].url.replace(/%s/gi, encodeURIComponent(keyword));
                                }
                                this._dic['active'] = superDrag.superDrag.open_type_link[position_link] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.link_type[position_link] === 4) {
                                this._dic['keywords'] = keyword;
                                this.handle_type = "qrcode";
                            }
                        } else {
                            if (superDrag.superDrag.text_type[position_text] === 0) {
                                if (superDrag.superDrag.searchEngines[position_text].url) {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_text] + " 文本 - " + _text_type[superDrag.superDrag.text_type[position_text]] + " - " + chrome.i18n.getMessage("custom_search");
                                } else {
                                    this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_text] + " 文本 - " + _text_type[superDrag.superDrag.text_type[position_text]] + " - " + _build_in_seach_engines[superDrag.superDrag.searchEngines[position_text]].name;
                                }
                            } else {
                                this.notice.innerHTML = this.arrow[superDrag.superDrag.direction_sel][position_text] + " 文本 - " + _text_type[superDrag.superDrag.text_type[position_text]];
                            }
                            if (superDrag.superDrag.text_type[position_text] === 0) {
                                if (superDrag.superDrag.searchEngines[position_text].url) {
                                    this._dic['url'] = superDrag.superDrag.searchEngines[position_text].url.replace(/%s/gi, encodeURIComponent(keyword));
                                } else {
                                    this._dic['url'] = _build_in_seach_engines[superDrag.superDrag.searchEngines[position_text]].url.replace(/%s/gi, encodeURIComponent(keyword));
                                }
                                this._dic['active'] = superDrag.superDrag.open_type[position_text] === 0;
                                this._dic['flag'] = 'openTable';
                                this.handle_type = "sendMessage";
                            } else if (superDrag.superDrag.text_type[position_text] === 1) {
                                this._dic['keywords'] = keyword;
                                this.handle_type = "copyText";
                            } else if (superDrag.superDrag.text_type[position_text] === 2) {
                                this._dic['keywords'] = keyword;
                                this.handle_type = "qrcode";
                            }
                        }
                    } else {
                        this.notice.innerHTML = "Some mistakes have occurred.";
                    }
                }
            }
        } else {
            this.notice.style.display = "none";
        }
    }

    dragend(event, superDrag) {
        if (!this._dic.timeout && !this.toCancel && ["link", "none"].indexOf(this.dragEvent.dataTransfer.dropEffect) != -1) {
            if (this.handle_type == "sendMessage") {
                chrome.runtime.sendMessage(this._dic);
            } else if (this.handle_type == "copyText") {
                this.copyText(this._dic['keywords'])
            } else if (this.handle_type == "copyImage") {
                this.copyImage(this._dic['keywords'])
            } else if (this.handle_type == "qrcode") {
                this.qrcode(this._dic['keywords'])
            } else if (this.handle_type == "sendMessageDownload") {
                try {
                    chrome.runtime.sendMessage(this._dic);
                    SuperDrag.toast("下载图片，处理中……");
                } catch (err) {
                    SuperDrag.toast("下载图片失败:" + err.message);
                }
            }
        }
        if (document.getElementById("notice-superDrag" + this._dic.start_time) != null) {
            document.body.removeChild(this.notice);
        }
        this.clear_up();
    }

    clear_up() {
        this._dic = {};
        this.handle_type = null;
        this.dragEvent = null;
        this.dragInBox = false;
        this.currentDragDirection = null;
        this.toCancel = false;
        this.notice = null;
        this.containsImg = null;
        document.removeEventListener('dragstart', this.dragstart, false);
        document.removeEventListener('dragover', this.dragover, false);
        document.removeEventListener('dragend', this.dragend, false);
    }

    // 遍历节点
    findImg(treeNode){ //遍历树  获取判断是否存在图片
        for (let ele of treeNode) {
            if (ele.nodeName.toLowerCase() == 'img') {
                this.containsImg = ele;
                break;
            }
            if (ele.childNodes.length > 0) {
                this.findImg(ele.childNodes);
                if (this.containsImg) {return;}
            }
        }
        return;
    }

    // toast提示信息
    static toast(msg, duration) {
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

    // 生成二维码
    qrcode(something) {
        var width_n = document.body.scrollWidth
        var height_n = document.body.scrollHeight
        var n = document.createElement('div');
        n.style.cssText = "position: absolute;left: 0%;top: 0%;width: " + width_n + "px;height: " + height_n + "px;z-index: 2147483646;filter: opacity(0.8);background-color: slategray;";
        document.body.appendChild(n);
        var m = document.createElement('div');
        m.style.cssText = "position: fixed;top: 5%;right: 5%;z-index: 2147483647;";
        document.body.appendChild(m);
        var side = document.body.clientWidth/5
        new QRCode(m, {
            text: something,
            width: side,
            height: side,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        document.body.addEventListener('click', () => {document.body.removeChild(m);document.body.removeChild(n);}, {once: true});
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
                SuperDrag.toast("复制成功");
            } catch (err) {
                console.warn('Was not possible to copy te text: ', err);
                SuperDrag.toast("复制失败:" + err.message);
            }

            document.body.removeChild(textArea)
            return;
        }
        navigator.clipboard.writeText(word).then(function () {
            console.log(`successful!`);
            SuperDrag.toast("复制成功")
        }, function (err) {
            console.warn('unsuccessful!', err);
            SuperDrag.toast("复制失败:" + err.message);
        });
    }

    // 复制图片
    async copyImage(url) {
        try {
            const data = await fetch(url, {mode: "no-cors"});
            const blob = await data.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            console.log('Image copied.');
            SuperDrag.toast("复制成功")
        } catch (err) {
            console.error(err.name, err.message);
            SuperDrag.toast("复制失败:" + err.message);
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
                this.count_label.style.fontWeight = "bolder";
                this.count_label.style.font = "Arial, sans-serif";
                this.count_label.style.color = "#FFFFFF";
                this.count_label.style.backgroundColor = "#516F9C";
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
        chrome.runtime.sendMessage(_dic);

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
