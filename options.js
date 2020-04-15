for (var i = 0; i < 4; i++) {
		document.getElementById("search_engine_select_" + i).addEventListener(
				"change", function() {
					save_search_engine(this)
				}, false);
	}
var superDrag = _getLocal();
if(superDrag.type_text){
	document.getElementById('type_text').checked = superDrag.type_text;
}
document.getElementById('fieldtext0').innerHTML = chrome.i18n.getMessage('fieldtext0');
document.getElementById('text0').innerHTML = chrome.i18n.getMessage('text0');
for (var i = 0; i < 4; i++) {
	var engines = superDrag.searchEngines;
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

function _init_selects(_id) {
	var _select = document.getElementById("search_engine_select_" + _id);
	if (!_select.options.length) {
		for (var i = 0; i < _build_in_seach_engines.length; i++)
			_select.add(new Option(_build_in_seach_engines[i].name, i, false));
		_select.add(new Option(chrome.i18n.getMessage("custom_search"), -1,
				false, false));
	}
	return _select;
}

function save_search_engine(_select) {// select
	var _id = _select.title;
	var _v = _select.options[_select.selectedIndex].value;
	var superDrag = _getLocal();
	if (_v == -1) {// add new
		if (isNaN(superDrag.searchEngines[_id]))// still from select
			document.getElementById("search_engine_url_" + _id).value = superDrag.searchEngines[_id].url;
		else
			document.getElementById("search_engine_url_" + _id).value = "";
		document.getElementById("search_engine_url_" + _id).readOnly = false;
	} else {// select from build-in
		document.getElementById("search_engine_url_" + _id).value = _build_in_seach_engines[_v].url;
		document.getElementById("search_engine_url_" + _id).readOnly = true;
		superDrag.searchEngines[_id] = _v;
	}
}