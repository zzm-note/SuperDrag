chrome.storage.sync.get({superDrag: _getDefault()}, function (superDrag) {
    let types;
    let _s;
    let i;
    document.getElementById("effect_text").addEventListener(
        "change", function () {
            _save_effect_text(this, superDrag);
        }, false);
    document.getElementById("effect_link").addEventListener(
        "change", function () {
            _save_effect_link(this, superDrag);
        }, false);
    document.getElementById("effect_img").addEventListener(
        "change", function () {
            _save_effect_img(this, superDrag);
        }, false);
    for (i = 0; i < 4; i++) {
        document.getElementById("open_type_" + i).addEventListener(
            "change", function () {
                _save_open_type(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("open_type_link_" + i).addEventListener(
            "change", function () {
                _save_open_type_link(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("open_type_img_" + i).addEventListener(
            "change", function () {
                _save_open_type_img(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("text_type_" + i).addEventListener(
            "change", function () {
                _save_text_type(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("link_type_" + i).addEventListener(
            "change", function () {
                _save_link_type(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("img_type_" + i).addEventListener(
            "change", function () {
                _save_img_type(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("search_engine_select_" + i).addEventListener(
            "change", function () {
                _save_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("link_search_engine_select_" + i).addEventListener(
            "change", function () {
                _save_link_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("img_search_engine_select_" + i).addEventListener(
            "change", function () {
                _save_img_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("search_engine_url_" + i).addEventListener(
            "change", function () {
                _add_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("link_search_engine_url_" + i).addEventListener(
            "change", function () {
                _add_link_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("img_search_engine_url_" + i).addEventListener(
            "change", function () {
                _add_img_search_engine(this, superDrag);
            }, false);
    }
    document.getElementById("enable_link_text_select").addEventListener(
        "change", function () {
            superDrag.superDrag.linkTextSelect = this.checked;
            _save(superDrag.superDrag);
        }, false);
    document.getElementById("enableAlt").addEventListener(
        "change", function () {
            superDrag.superDrag.enableAlt = this.checked;
            _save(superDrag.superDrag);
            console.log(superDrag);
        }, false);
    document.getElementById("firstEvent").addEventListener(
        "change", function () {
            superDrag.superDrag.firstEvent = this.checked;
            _save(superDrag.superDrag);
            console.log(superDrag);
        }, false);
    document.getElementById("timeout").addEventListener(
        "change", function () {
            if(isNaN(this.value) || this.value.length === 0) {
                alert("\u4E0D\u80FD\u8F93\u5165\u7A7A\u6216\u975E\u6574\u578B\uFF01");
                document.getElementById('timeout').value = superDrag.superDrag.timeout;
            } else {
                superDrag.superDrag.timeout = Number(this.value);
                _save(superDrag.superDrag);
            }
        }, false);

    document.getElementById('timeout').value = superDrag.superDrag.timeout;
    for (i = 0; i < 3; i++) {
        _s = _init_effect_text(i);
    }
    _s.selectedIndex = superDrag.superDrag.effect_text;
    _load_effect_text(superDrag.superDrag.effect_text);
    for (i = 0; i < 3; i++) {
        _s = _init_effect_link(i);
    }
    _s.selectedIndex = superDrag.superDrag.effect_link;
    _load_effect_link(superDrag.superDrag.effect_link);
    for (i = 0; i < 3; i++) {
        _s = _init_effect_img(i);
    }
    _s.selectedIndex = superDrag.superDrag.effect_img;
    _load_effect_img(superDrag.superDrag.effect_img);
    document.getElementById('common').innerHTML = chrome.i18n.getMessage('common');
    document.getElementById('enableAlt_text').innerHTML = chrome.i18n.getMessage('enableAlt_text');
    document.getElementById('timeout_des').innerHTML = chrome.i18n.getMessage('timeout_des');
    document.getElementById('timeout_des2').innerHTML = chrome.i18n.getMessage('timeout_des2');
    document.getElementById('firstEventDesc').innerHTML = chrome.i18n.getMessage('firstEventDesc');
    document.getElementById('fieldtext0').innerHTML = chrome.i18n.getMessage('fieldtext0');
    document.getElementById('fieldlink0').innerHTML = chrome.i18n.getMessage('fieldlink0');
    document.getElementById('fieldimg0').innerHTML = chrome.i18n.getMessage('fieldimg0');
    document.getElementById('enableLinkTextSelect').innerHTML = chrome.i18n.getMessage('enableLinkTextSelect');
    document.getElementById('searchUrlDescription').innerHTML = chrome.i18n.getMessage('searchUrlDescription');
    document.getElementById('linkSearchUrlDescription').innerHTML = chrome.i18n.getMessage('searchUrlDescription');
    document.getElementById('imgSearchUrlDescription').innerHTML = chrome.i18n.getMessage('searchUrlDescription');
    document.getElementById("enable_link_text_select").checked = superDrag.superDrag.linkTextSelect;
    document.getElementById("enableAlt").checked = superDrag.superDrag.enableAlt;
    document.getElementById("firstEvent").checked = superDrag.superDrag.firstEvent;

    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.open_type;
        _s = _init_open_type(i);
        _s.selectedIndex = types[i];
    }
    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.open_type_link;
        _s = _init_open_type_link(i);
        _s.selectedIndex = types[i];
    }
    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.open_type_img;
        _s = _init_open_type_img(i);
        _s.selectedIndex = types[i];
    }
    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.text_type;
        _s = _init_text_type(i);
        if (types[i]) {
            document.getElementById("open_type_" + i).style.display = "none";
            document.getElementById("search_engine_select_" + i).style.display = "none";
            document.getElementById("search_engine_url_" + i).style.display = "none";
        } else {
            document.getElementById("open_type_" + i).style.display = "";
            document.getElementById("search_engine_select_" + i).style.display = "";
            document.getElementById("search_engine_url_" + i).style.display = "";
            _load_search_engine()
        }
        _s.selectedIndex = types[i];
    }
    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.link_type;
        _s = _init_link_type(i);
        if (types[i] === 0) {
            document.getElementById("open_type_link_" + i).style.display = "";
            document.getElementById("link_search_engine_select_" + i).style.display = "none";
            document.getElementById("link_search_engine_url_" + i).style.display = "none";
        } else if (types[i] === 3) {
            document.getElementById("open_type_link_" + i).style.display = "";
            document.getElementById("link_search_engine_select_" + i).style.display = "";
            document.getElementById("link_search_engine_url_" + i).style.display = "";
            _load_link_search_engine()
        } else {
            document.getElementById("open_type_link_" + i).style.display = "none";
            document.getElementById("link_search_engine_select_" + i).style.display = "none";
            document.getElementById("link_search_engine_url_" + i).style.display = "none";
        }
        _s.selectedIndex = types[i];
    }
    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.img_type;
        _s = _init_img_type(i);
        if (types[i] === 0 || types[i] === 1) {
            document.getElementById("open_type_img_" + i).style.display = "";
            document.getElementById("img_search_engine_select_" + i).style.display = "none";
            document.getElementById("img_search_engine_url_" + i).style.display = "none";
        } else if (types[i] === 5) {
            document.getElementById("open_type_img_" + i).style.display = "";
            document.getElementById("img_search_engine_select_" + i).style.display = "";
            document.getElementById("img_search_engine_url_" + i).style.display = "";
            _load_img_search_engine()
        } else {
            document.getElementById("open_type_img_" + i).style.display = "none";
            document.getElementById("img_search_engine_select_" + i).style.display = "none";
            document.getElementById("img_search_engine_url_" + i).style.display = "none";
        }
        _s.selectedIndex = types[i];
    }

    function _load_effect_text(_id) {
        if (_id === 1) {
            for (i of [0, 1]) {
                document.getElementById("test_" + i).style.display = "";
            }
            for (i of [2, 3]) {
                document.getElementById("test_" + i).style.display = "none";
            }
        } else if (_id === 2) {
            for (i of [0, 1]) {
                document.getElementById("test_" + i).style.display = "none";
            }
            for (i of [2, 3]) {
                document.getElementById("test_" + i).style.display = "";
            }
        } else if (_id === 0) {
            for (i of [0, 1, 2, 3]) {
                document.getElementById("test_" + i).style.display = "";
            }
        }
    }

    function _load_effect_link(_id) {
        if (_id === 1) {
            for (i of [0, 1]) {
                document.getElementById("link_" + i).style.display = "";
            }
            for (i of [2, 3]) {
                document.getElementById("link_" + i).style.display = "none";
            }
            document.getElementById("linkTextSelect").style.display = "none";
        } else if (_id === 2) {
            for (i of [0, 1]) {
                document.getElementById("link_" + i).style.display = "none";
            }
            for (i of [2, 3]) {
                document.getElementById("link_" + i).style.display = "";
            }
            document.getElementById("linkTextSelect").style.display = "none";
        } else if (_id === 0) {
            for (i of [0, 1, 2, 3]) {
                document.getElementById("link_" + i).style.display = "";
            }
            document.getElementById("linkTextSelect").style.display = "none";
        }
    }
    
    function _load_effect_img(_id) {
        if (_id === 1) {
            for (i of [0, 1]) {
                document.getElementById("img_" + i).style.display = "";
            }
            for (i of [2, 3]) {
                document.getElementById("img_" + i).style.display = "none";
            }
        } else if (_id === 2) {
            for (i of [0, 1]) {
                document.getElementById("img_" + i).style.display = "none";
            }
            for (i of [2, 3]) {
                document.getElementById("img_" + i).style.display = "";
            }
        } else if (_id === 0) {
            for (i of [0, 1, 2, 3]) {
                document.getElementById("img_" + i).style.display = "";
            }
        }
    }

    function _load_search_engine() {
        for (let i = 0; i < 4; i++) {
            const engines = superDrag.superDrag.searchEngines;
            const _s = _init_selects(i);
            if (isNaN(engines[i])) {// user search engines
                document.getElementById("search_engine_url_" + i).value = engines[i].url;
                _s.selectedIndex = _build_in_seach_engines.length;
                document.getElementById("search_engine_url_" + i).readOnly = false;
            } else {// build-in
                document.getElementById("search_engine_url_" + i).value = _build_in_seach_engines[engines[i]].url;
                _s.selectedIndex = engines[i];
                document.getElementById("search_engine_url_" + i).readOnly = true;
            }
        }
    }

    function _load_link_search_engine() {
        for (let i = 0; i < 4; i++) {
            const engines = superDrag.superDrag.linkSearchEngines;
            const _s = _init_link_selects(i);
            if (isNaN(engines[i])) {// user search engines
                document.getElementById("link_search_engine_url_" + i).value = engines[i].url;
                _s.selectedIndex = _build_in_seach_engines.length;
                document.getElementById("link_search_engine_url_" + i).readOnly = false;
            } else {// build-in
                document.getElementById("link_search_engine_url_" + i).value = _build_in_seach_engines[engines[i]].url;
                _s.selectedIndex = engines[i];
                document.getElementById("link_search_engine_url_" + i).readOnly = true;
            }
        }
    }

    function _load_img_search_engine() {
        for (let i = 0; i < 4; i++) {
            const engines = superDrag.superDrag.imgSearchEngines;
            const _s = _init_img_selects(i);
            if (isNaN(engines[i])) {// user search engines
                document.getElementById("img_search_engine_url_" + i).value = engines[i].url;
                _s.selectedIndex = _build_in_seach_engines_for_img.length;
                document.getElementById("img_search_engine_url_" + i).readOnly = false;
            } else {// build-in
                document.getElementById("img_search_engine_url_" + i).value = _build_in_seach_engines_for_img[engines[i]].url;
                _s.selectedIndex = engines[i];
                document.getElementById("img_search_engine_url_" + i).readOnly = true;
            }
        }
    }

    function _init_effect_text() {
        const _select = document.getElementById("effect_text");
        if (!_select.options.length) {
            for (let i = 0; i < _effect_text.length; i++) {
                _select.add(new Option(_effect_text[i], i, false));
            }
        }
        return _select;
    }

    function _init_effect_link() {
        const _select = document.getElementById("effect_link");
        if (!_select.options.length) {
            for (let i = 0; i < _effect_link.length; i++) {
                _select.add(new Option(_effect_link[i], i, false));
            }
        }
        return _select;
    }

    function _init_effect_img() {
        const _select = document.getElementById("effect_img");
        if (!_select.options.length) {
            for (let i = 0; i < _effect_img.length; i++) {
                _select.add(new Option(_effect_img[i], i, false));
            }
        }
        return _select;
    }

    function _init_open_type(_id) {
        const _select = document.getElementById("open_type_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _open_type.length; i++) {
                _select.add(new Option(_open_type[i], i, false));
            }
        }
        return _select;
    }

    function _init_open_type_link(_id) {
        const _select = document.getElementById("open_type_link_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _open_type.length; i++) {
                _select.add(new Option(_open_type[i], i, false));
            }
        }
        return _select;
    }

    function _init_open_type_img(_id) {
        const _select = document.getElementById("open_type_img_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _open_type.length; i++) {
                _select.add(new Option(_open_type[i], i, false));
            }
        }
        return _select;
    }

    function _init_text_type(_id) {
        const _select = document.getElementById("text_type_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _text_type.length; i++) {
                _select.add(new Option(_text_type[i], i, false));
            }
        }
        return _select;
    }

    function _init_link_type(_id) {
        const _select = document.getElementById("link_type_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _link_type.length; i++) {
                _select.add(new Option(_link_type[i], i, false));
            }
        }
        return _select;
    }

    function _init_img_type(_id) {
        const _select = document.getElementById("img_type_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _img_type.length; i++) {
                _select.add(new Option(_img_type[i], i, false));
            }
        }
        return _select;
    }

    function _init_selects(_id) {
        const _select = document.getElementById("search_engine_select_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _build_in_seach_engines.length; i++) {
                _select.add(new Option(_build_in_seach_engines[i].name, i, false));
            }
            _select.add(new Option(chrome.i18n.getMessage("custom_search"), -1,
                false, false));
        }
        return _select;
    }

    function _init_link_selects(_id) {
        const _select = document.getElementById("link_search_engine_select_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _build_in_seach_engines.length; i++) {
                _select.add(new Option(_build_in_seach_engines[i].name, i, false));
            }
            _select.add(new Option(chrome.i18n.getMessage("custom_search"), -1,
                false, false));
        }
        return _select;
    }

    function _init_img_selects(_id) {
        const _select = document.getElementById("img_search_engine_select_" + _id);
        if (!_select.options.length) {
            for (let i = 0; i < _build_in_seach_engines_for_img.length; i++) {
                _select.add(new Option(_build_in_seach_engines_for_img[i].name, i, false));
            }
            _select.add(new Option(chrome.i18n.getMessage("custom_search"), -1,
                false, false));
        }
        return _select;
    }

    function _save_effect_text(_select, superDrag) {// select
        const _v = _select.options[_select.selectedIndex].value;
        _load_effect_text(Number(_v));
        superDrag.superDrag.effect_text = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_effect_link(_select, superDrag) {// select
        const _v = _select.options[_select.selectedIndex].value;
        _load_effect_link(Number(_v));
        superDrag.superDrag.effect_link = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_effect_img(_select, superDrag) {// select
        const _v = _select.options[_select.selectedIndex].value;
        _load_effect_img(Number(_v));
        superDrag.superDrag.effect_img = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_open_type(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        superDrag.superDrag.open_type[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_open_type_link(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        superDrag.superDrag.open_type_link[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_open_type_img(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        superDrag.superDrag.open_type_img[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_text_type(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        if (Number(_v) === 1) {
            document.getElementById("open_type_" + _id).style.display = "none";
            document.getElementById("search_engine_select_" + _id).style.display = "none";
            document.getElementById("search_engine_url_" + _id).style.display = "none";
        } else {
            document.getElementById("open_type_" + _id).style.display = "";
            document.getElementById("search_engine_select_" + _id).style.display = "";
            document.getElementById("search_engine_url_" + _id).style.display = "";
            document.getElementById("search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
            document.getElementById("search_engine_url_" + _id).readOnly = true;
        }
        _load_search_engine();
        superDrag.superDrag.text_type[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_link_type(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        if (Number(_v) === 0) {
            document.getElementById("open_type_link_" + _id).style.display = "";
            document.getElementById("link_search_engine_select_" + _id).style.display = "none";
            document.getElementById("link_search_engine_url_" + _id).style.display = "none";
        } else if (Number(_v) === 3){
            document.getElementById("open_type_link_" + _id).style.display = "";
            document.getElementById("link_search_engine_select_" + _id).style.display = "";
            document.getElementById("link_search_engine_url_" + _id).style.display = "";
        } else {
            document.getElementById("open_type_link_" + _id).style.display = "none";
            document.getElementById("link_search_engine_select_" + _id).style.display = "none";
            document.getElementById("link_search_engine_url_" + _id).style.display = "none";
        }
        _load_link_search_engine();
        superDrag.superDrag.link_type[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_img_type(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        if (Number(_v) === 0 || Number(_v) === 1) {
            document.getElementById("open_type_img_" + _id).style.display = "";
            document.getElementById("img_search_engine_select_" + _id).style.display = "none";
            document.getElementById("img_search_engine_url_" + _id).style.display = "none";
        } else if (Number(_v) === 5){
            document.getElementById("open_type_img_" + _id).style.display = "";
            document.getElementById("img_search_engine_select_" + _id).style.display = "";
            document.getElementById("img_search_engine_url_" + _id).style.display = "";
        } else {
            document.getElementById("open_type_img_" + _id).style.display = "none";
            document.getElementById("img_search_engine_select_" + _id).style.display = "none";
            document.getElementById("img_search_engine_url_" + _id).style.display = "none";
        }
        _load_img_search_engine();
        superDrag.superDrag.img_type[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_search_engine(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        if (Number(_v) === -1) {// add new
            if (isNaN(superDrag.superDrag.searchEngines[_id]))// still from select
                document.getElementById("search_engine_url_" + _id).value = superDrag.superDrag.searchEngines[_id].url;
            else
                document.getElementById("search_engine_url_" + _id).value = "";
            document.getElementById("search_engine_url_" + _id).readOnly = false;
        } else {// select from build-in
            document.getElementById("search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
            document.getElementById("search_engine_url_" + _id).readOnly = true;
            superDrag.superDrag.searchEngines[_id] = Number(_v);
            _save(superDrag.superDrag);
        }
    }

    function _save_link_search_engine(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        if (Number(_v) === -1) {// add new
            if (isNaN(superDrag.superDrag.linkSearchEngines[_id]))// still from select
                document.getElementById("link_search_engine_url_" + _id).value = superDrag.superDrag.linkSearchEngines[_id].url;
            else
                document.getElementById("link_search_engine_url_" + _id).value = "";
            document.getElementById("link_search_engine_url_" + _id).readOnly = false;
        } else {// select from build-in
            document.getElementById("link_search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
            document.getElementById("link_search_engine_url_" + _id).readOnly = true;
            superDrag.superDrag.linkSearchEngines[_id] = Number(_v);
            _save(superDrag.superDrag);
        }
    }

    function _save_img_search_engine(_select, superDrag) {// select
        const _id = _select.getAttribute("myAttr");
        const _v = _select.options[_select.selectedIndex].value;
        if (Number(_v) === -1) {// add new
            if (isNaN(superDrag.superDrag.imgSearchEngines[_id]))// still from select
                document.getElementById("img_search_engine_url_" + _id).value = superDrag.superDrag.imgSearchEngines[_id].url;
            else
                document.getElementById("img_search_engine_url_" + _id).value = "";
            document.getElementById("img_search_engine_url_" + _id).readOnly = false;
        } else {// select from build-in
            document.getElementById("img_search_engine_url_" + _id).value = _build_in_seach_engines_for_img[_v].url;
            document.getElementById("img_search_engine_url_" + _id).readOnly = true;
            superDrag.superDrag.imgSearchEngines[_id] = Number(_v);
            _save(superDrag.superDrag);
        }
    }

    function _add_search_engine(_id, superDrag) {// add new
        const url = document.getElementById("search_engine_url_" + _id.getAttribute("myAttr")).value;
        superDrag.superDrag.searchEngines[_id.getAttribute("myAttr")] = {
            'url': url
        };
        _save(superDrag.superDrag);
    }

    function _add_link_search_engine(_id, superDrag) {// add new
        const url = document.getElementById("link_search_engine_url_" + _id.getAttribute("myAttr")).value;
        superDrag.superDrag.linkSearchEngines[_id.getAttribute("myAttr")] = {
            'url': url
        };
        _save(superDrag.superDrag);
    }

    function _add_img_search_engine(_id, superDrag) {// add new
        const url = document.getElementById("img_search_engine_url_" + _id.getAttribute("myAttr")).value;
        superDrag.superDrag.imgSearchEngines[_id.getAttribute("myAttr")] = {
            'url': url
        };
        _save(superDrag.superDrag);
    }

    function _save(superDrag) {
        chrome.storage.sync.set({superDrag: superDrag}, function () {
        });
    }
})