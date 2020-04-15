function _getLocal() {
	var superDrag = localStorage.getItem("superDrag");
	if (!superDrag)
		return _getDefault();
	return JSON.parse(superDrag);
}

function _getDefault() {
	return {
		"type_text" : true,
		"searchEngines" : [0, 1, 11, 3]
	};
}

var _build_in_seach_engines = [{
			"name" : "wikipedia",
			"favicon" : "./favicon/wikipedia.ico",
			"url" : "http://en.wikipedia.org/wiki/How%s"
		}, {
			"name" : "google",
			"favicon" : "./favicon/google.ico",
			"url" : "http://www.google.com/search?hl=en&q=%s"
		}, {
			"name" : "douban",
			"favicon" : "./favicon/douban.ico",
			"url" : "http://www.douban.com/search?search_text=%s"
		}, {
			"name" : "twitter",
			"favicon" : "./favicon/twitter.ico",
			"url" : "http://twitter.com/search?q=%s"
		}, {
			"name" : "bing",
			"favicon" : "./favicon/bing.ico",
			"url" : "http://www.bing.com/search?setmkt=en-US&q=%s"
		}, {
			"name" : "taobao",
			"favicon" : "./favicon/taobao.ico",
			"url" : "http://s.taobao.com/search?q=%s"
		}, {
			"name" : "shooter",
			"favicon" : "./favicon/shooter.ico",
			"url" : "http://shooter.cn/search/%s"
		}, {
			"name" : "amazon",
			"favicon" : "./favicon/amazon.ico",
			"url" : "http://www.amazon.com/s/field-keywords=%s"
		}, {
			"name" : "delicious",
			"favicon" : "./favicon/delicious.ico",
			"url" : "http://delicious.com/search?p=%s"
		}, {
			"name" : "flickr",
			"favicon" : "./favicon/flickr.ico",
			"url" : "http://www.flickr.com/search/?q=%s"
		}, {
			"name" : "technorati",
			"favicon" : "./favicon/technorati.ico",
			"url" : "http://technorati.com/search?return=posts&authority=high&q=%s"
		}, {
			"name" : "youtube",
			"favicon" : "./favicon/youtube.ico",
			"url" : "http://www.youtube.com/results?search_query=%s"
		}, {
			"name" : "ebay",
			"favicon" : "./favicon/ebay.ico",
			"url" : "http://shop.ebay.com/?_nkw=%s&_sacat=See-All-Categories"
		}, {
			"name" : "imdb",
			"favicon" : "./favicon/imdb.ico",
			"url" : "http://www.imdb.com/find?s=all&q=%s"
		}, {
			"name" : "google encrypted",
			"favicon" : "./favicon/google.ico",
			"url" : "https://encrypted.google.com/search?hl=en&q=%s"
		}, {
			"name" : "wolfram alpha",
			"favicon" : "./favicon/wolfram.ico",
			"url" : "http://www.wolframalpha.com/input/?i=%s"
		}, {
			"name" : "yahoo",
			"favicon" : "./favicon/yahoo.ico",
			"url" : "http://search.yahoo.com/search?fr=crmas&p=%s"
		}, {
			"name" : "pinterest",
			"favicon" : "./favicon/pinterest.ico",
			"url" : "http://pinterest.com/search/?q=%s"
		}];

function _check_radio(_id) {
	var _radio = document.getElementById(_id);
	if (_radio)
		_radio.checked = true;
}

function _show_search_yadng_zone(_i, _img, _opacity) {
	var _zone = document.getElementById("search_engine_zone_" + _i);
	if (_zone) {
		_zone.style.backgroundImage = "url('" + _img + "')";
		_zone.style.opacity = _opacity;
	}

	var _input = document.getElementById("search_engine_url_" + _i);
	if (_input) {
		_input.style.backgroundImage = "url('" + _img + "')";
	}
}

var _i18n_msgs = ["reset_btn", "vote_legend", "feedback_a", "url_legend",
		"fb_legend", "ab_legend", "search_legend", "se_legend", "url_helper_p",
		"search_helper_p", "selected_mode_0_label", "selected_mode_1_label",
		"selected_mode_2_label", "index_mode_0_label", "index_mode_1_label",
		"index_mode_2_label", "lu_strong", "ru_strong", "ld_strong",
		"rd_strong", "search_engine_a_0", "search_engine_a_1",
		"search_engine_a_2", "search_engine_a_3"];
