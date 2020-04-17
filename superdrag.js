chrome.storage.sync.get({superDrag: _getDefault()}, function(superDrag) {
    async function copyPageUrl(select) {
      try {
        await navigator.clipboard.writeText(select.href);
        console.log('Page URL copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
    if (superDrag.superDrag.effect_text) {
        const _dic = {};
        let searchEng;
        const isTextArea = element => element.matches(
            'input[type="email"], input[type="number"], input[type="password"], input[type="search"], ' +
            'input[type="tel"], input[type="text"], input[type="url"], textarea'
        ) && !element.disabled;
        document.addEventListener('dragstart', event => {
            _dic.startX = event.x;
            _dic.startY = event.y;
        }, false);
        document.addEventListener('dragover', event => {
            if (event.dataTransfer.types.includes('text/plain')) {
                if (superDrag.superDrag.effect_text && !isTextArea(event.target)) {
                    event.dataTransfer.dropEffect = 'link';
                    event.preventDefault();
                }
            }
        }, false);
        document.addEventListener('drop', event => {
            // const dic = {'openBackgroud': superDrag.superDrag.openBackgroud};
            _dic.endX = event.x;
            _dic.endY = event.y;
            if (_dic.endX < _dic.startX) {
                if (_dic.endY < _dic.startY) {
                    searchEng = 0;
                } else {
                    searchEng = 1;
                }
            } else {
                if (_dic.endY < _dic.startY) {
                    searchEng = 2;
                } else {
                    searchEng = 3;
                }
            }
            if (event.dataTransfer.types.includes('text/plain')) {
                if (superDrag.superDrag.effect_text && !isTextArea(event.target)) {
                    const keyword = event.dataTransfer.getData('text/plain');
                    if (superDrag.superDrag.searchEngines[searchEng].url){
                        _dic['url'] = superDrag.superDrag.searchEngines[searchEng].url.replace(/%s/gi, encodeURIComponent(keyword));
                    } else {
                        _dic['url'] = _build_in_seach_engines[superDrag.superDrag.searchEngines[searchEng]].url.replace(/%s/gi, encodeURIComponent(keyword));
                    }
                    chrome.runtime.sendMessage(_dic);
                    event.preventDefault();
                }
            }
        }, false);
    }
    if (superDrag.superDrag.enableLinkTextSelect) {
        // The original code is copyrighted by Griever and licensed under the MIT license.
        class LinkDragSelection {
            constructor() {
                this.init(...arguments);
            }

            init(event) {
                this.moved_flag = false;
                this.range = document.caretRangeFromPoint(event.clientX, event.clientY);
                const sel = getSelection();
                if (!sel.isCollapsed &&
                    sel.getRangeAt(0).isPointInRange(this.range.startContainer, this.range.startOffset)) {
                    return;
                }
                this.screenX = event.screenX;
                this.screenY = event.screenY;
                document.addEventListener('mousemove', this, false);
                document.addEventListener('mouseup', this, false);
            }

            uninit() {
                this.moved_flag = false;
                document.removeEventListener('mousemove', this, false);
                document.removeEventListener('mouseup', this, false);
                document.removeEventListener('dragstart', this, false);
                setTimeout(() => {
                    document.removeEventListener('click', this, false);
                }, 100);
            }

            handleEvent(event) {
                switch (event.type) {
                    case 'mousemove':
                        if (this.moved_flag) {
                            const range = document.caretRangeFromPoint(event.clientX, event.clientY);
                            if (range) {
                                getSelection().extend(range.startContainer, range.startOffset);
                            }
                        } else {
                            this.moveX = event.screenX;
                            this.moveY = event.screenY;
                            this.checkXY();
                        }
                        break;
                    case 'mouseup':
                        this.uninit();
                        break;
                    case 'dragstart':
                        event.currentTarget.removeEventListener(event.type, this, false);
                        if (this.moved_flag) {
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            this.checkXY();
                        }
                        break;
                    case 'click':
                        event.currentTarget.removeEventListener(event.type, this, false);
                        if (!getSelection().isCollapsed) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        break;
                }
            }

            selectionStart() {
                this.moved_flag = true;
                getSelection().collapse(this.range.startContainer, this.range.startOffset);
                document.addEventListener('dragstart', this, false);
                document.addEventListener('click', this, false);
            }

            checkXY() {
                const x = Math.abs(this.screenX - this.moveX);
                const y = Math.abs(this.screenY - this.moveY);
                if (x > y) {
                    this.selectionStart();
                } else if (x >= 4 || y >= 4) {
                    this.uninit();
                }
            }
        }

        document.addEventListener('mousedown', event => {
            if (event.button === 0 && !event.altKey && event.target.matches('a[href], a[href] *')) {
                new LinkDragSelection(event);
            }
        }, false);
    }
})