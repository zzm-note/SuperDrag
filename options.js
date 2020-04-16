chrome.storage.sync.get({superDrag: _getDefault()}, function(superDrag){
	document.getElementById("effect_text").addEventListener(
					"click", function() {
						superDrag.superDrag.effect_text = this.checked;
						_save(superDrag.superDrag);
						console.log(superDrag);
					}, false);
	for (var i = 0; i < 4; i++) {
		document.getElementById("text_type_" + i).addEventListener(
				"change", function() {
					_save_text_type(this, superDrag);
				}, false);
	}
	for (var i = 0; i < 4; i++) {
		document.getElementById("search_engine_select_" + i).addEventListener(
				"change", function() {
					_save_search_engine(this, superDrag);
				}, false);
	}
	for (var i = 0; i < 4; i++) {
		document.getElementById("search_engine_url_" + i).addEventListener(
				"change", function() {
					_add_search_engine(this, superDrag);
				}, false);
	}
	if(superDrag.superDrag.effect_text){
		document.getElementById('effect_text').checked = superDrag.superDrag.effect_text;
	}
	document.getElementById('fieldtext0').innerHTML = chrome.i18n.getMessage('fieldtext0');
	document.getElementById('text0').innerHTML = chrome.i18n.getMessage('text0');
	for (var i = 0; i < 4; i++) {
		var types = superDrag.superDrag.text_type;
		console.log(types);
		var _s = _init_text_type(i);
		if (types[i].toString() != '0'){
			document.getElementById("search_engine_select_" + i).style.display = "none";
			document.getElementById("search_engine_url_" + i).style.display = "none";
		} else {
			document.getElementById("search_engine_select_" + i).style.display = "";
			document.getElementById("search_engine_url_" + i).style.display = "";
			_change_select()
		}
		_s.selectedIndex = types[i];
	}

	function _change_select() {
		for (var i = 0; i < 4; i++) {
			var engines = superDrag.superDrag.searchEngines;
			var _s = _init_selects(i);
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

	function _init_text_type(_id) {
		var _select = document.getElementById("text_type_" + _id);
		if (!_select.options.length) {
			for (var i = 0; i < _text_type.length; i++) {
				_select.add(new Option(_text_type[i], i, false));
			}
		}
		return _select;
	}

	function _init_selects(_id) {
		var _select = document.getElementById("search_engine_select_" + _id);
		if (!_select.options.length) {
			for (var i = 0; i < _build_in_seach_engines.length; i++) {
				_select.add(new Option(_build_in_seach_engines[i].name, i, false));
			}
			_select.add(new Option(chrome.i18n.getMessage("custom_search"), -1,
					false, false));
		}
		return _select;
	}

	function _save_text_type(_select, superDrag) {// select
		var _id = _select.title;
		var _v = _select.options[_select.selectedIndex].value;
		if (_v == 1 || _v == 2) {
			document.getElementById("search_engine_select_" + _id).style.display = "none";
			document.getElementById("search_engine_url_" + _id).style.display = "none";
		} else {
			document.getElementById("search_engine_select_" + _id).style.display = "";
			document.getElementById("search_engine_url_" + _id).style.display = "";
			document.getElementById("search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
			document.getElementById("search_engine_url_" + _id).readOnly = true;
		}
		_change_select()
		superDrag.superDrag.text_type[_id] = _v;
		_save(superDrag.superDrag)
	}

	function _save_search_engine(_select, superDrag) {// select
		var _id = _select.title;
		var _v = _select.options[_select.selectedIndex].value;
		if (_v == -1) {// add new
			if (isNaN(superDrag.superDrag.searchEngines[_id]))// still from select
				document.getElementById("search_engine_url_" + _id).value = superDrag.superDrag.searchEngines[_id].url;
			else
				document.getElementById("search_engine_url_" + _id).value = "";
			document.getElementById("search_engine_url_" + _id).readOnly = false;
		} else {// select from build-in
			document.getElementById("search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
			document.getElementById("search_engine_url_" + _id).readOnly = true;
			superDrag.superDrag.searchEngines[_id] = _v;
			_save(superDrag.superDrag);
		}
	}

	function _add_search_engine(_id, superDrag) {// add new
		var url = document.getElementById("search_engine_url_" + _id.title).value;
		superDrag.superDrag.searchEngines[_id.title] = {
			'url' : url
		};
		_save(superDrag.superDrag);
	}

	function _save(superDrag) {
		chrome.storage.sync.set({superDrag: superDrag} ,function () {});
	}
})