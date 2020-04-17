chrome.storage.sync.get({superDrag: _getDefault()}, function (superDrag) {
    let types;
	let _s;
	let i;
	document.getElementById("effect_text").addEventListener(
        "change", function () {
            _save_effect_text(this, superDrag);
            console.log(superDrag);
        }, false);
    for (i = 0; i < 4; i++) {
        document.getElementById("open_type_" + i).addEventListener(
            "change", function () {
                _save_open_type(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("text_type_" + i).addEventListener(
            "change", function () {
                _save_text_type(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("search_engine_select_" + i).addEventListener(
            "change", function () {
                _save_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 4; i++) {
        document.getElementById("search_engine_url_" + i).addEventListener(
            "change", function () {
                _add_search_engine(this, superDrag);
            }, false);
    }
    for (i = 0; i < 3; i++) {
        _s = _init_effect_text(i);
    }
    _s.selectedIndex = superDrag.superDrag.effect_text;
    _load_effect_text(superDrag.superDrag.effect_text);
    document.getElementById('fieldtext0').innerHTML = chrome.i18n.getMessage('fieldtext0');
    for (i = 0; i < 4; i++) {
		types = superDrag.superDrag.open_type;
		_s = _init_open_type(i);
		_s.selectedIndex = types[i];
    }
    for (i = 0; i < 4; i++) {
        types = superDrag.superDrag.text_type;
        _s = _init_text_type(i);
        if (types[i]) {
            document.getElementById("search_engine_select_" + i).style.display = "none";
            document.getElementById("search_engine_url_" + i).style.display = "none";
        } else {
            document.getElementById("search_engine_select_" + i).style.display = "";
            document.getElementById("search_engine_url_" + i).style.display = "";
            _load_search_engine()
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

    function _init_effect_text() {
		const _select = document.getElementById("effect_text");
		if (!_select.options.length) {
            for (let i = 0; i < _effect_text.length; i++) {
                _select.add(new Option(_effect_text[i], i, false));
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

    function _init_text_type(_id) {
		const _select = document.getElementById("text_type_" + _id);
		if (!_select.options.length) {
            for (let i = 0; i < _text_type.length; i++) {
                _select.add(new Option(_text_type[i], i, false));
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

    function _save_effect_text(_select, superDrag) {// select
		const _v = _select.options[_select.selectedIndex].value;
		_load_effect_text(Number(_v));
        superDrag.superDrag.effect_text = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_open_type(_select, superDrag) {// select
		const _id = _select.getAttribute("myAttr");
		const _v = _select.options[_select.selectedIndex].value;
		superDrag.superDrag.open_type[_id] = Number(_v);
        _save(superDrag.superDrag)
    }

    function _save_text_type(_select, superDrag) {// select
		const _id = _select.getAttribute("myAttr");
		const _v = _select.options[_select.selectedIndex].value;
		if (Number(_v) === 1 || Number(_v) === 2) {
            document.getElementById("search_engine_select_" + _id).style.display = "none";
            document.getElementById("search_engine_url_" + _id).style.display = "none";
        } else {
            document.getElementById("search_engine_select_" + _id).style.display = "";
            document.getElementById("search_engine_url_" + _id).style.display = "";
            document.getElementById("search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
            document.getElementById("search_engine_url_" + _id).readOnly = true;
        }
        _load_search_engine();
        superDrag.superDrag.text_type[_id] = Number(_v);
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

    function _add_search_engine(_id, superDrag) {// add new
		const url = document.getElementById("search_engine_url_" + _id.getAttribute("myAttr")).value;
		superDrag.superDrag.searchEngines[_id.getAttribute("myAttr")] = {
            'url': url
        };
        _save(superDrag.superDrag);
    }

    function _save(superDrag) {
        chrome.storage.sync.set({superDrag: superDrag}, function () {
        });
    }
})