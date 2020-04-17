function _getDefault() {
	return {
		effect_text : 0,
		open_type : [0, 0, 0, 0],
		text_type : [0, 0, 0, 0],
		searchEngines : [0, 1, 11, 3]
	};
}

var _effect_text = ["\u4E0A\u4E0B\u5DE6\u53F3", "\u4E0A\u4E0B", "\u5DE6\u53F3"];
var _open_type = ["\u524D\u53F0", "\u540E\u53F0"];
var _text_type = ["\u641C\u7D22", "\u7FFB\u8BD1", "\u590D\u5236"];

var _build_in_seach_engines = [{
			"name" : "wikipedia",
			"url" : "https://en.wikipedia.org/wiki/How%s"
		}, {
			"name" : "google",
			"url" : "https://www.google.com/search?hl=en&q=%s"
		}, {
			"name" : "douban",
			"url" : "https://www.douban.com/search?search_text=%s"
		}, {
			"name" : "twitter",
			"url" : "https://twitter.com/search?q=%s"
		}, {
			"name" : "bing",
			"url" : "https://www.bing.com/search?setmkt=en-US&q=%s"
		}, {
			"name" : "taobao",
			"url" : "https://s.taobao.com/search?q=%s"
		}, {
			"name" : "shooter",
			"url" : "https://shooter.cn/search/%s"
		}, {
			"name" : "amazon",
			"url" : "https://www.amazon.com/s/field-keywords=%s"
		}, {
			"name" : "delicious",
			"url" : "https://delicious.com/search?p=%s"
		}, {
			"name" : "flickr",
			"url" : "https://www.flickr.com/search/?q=%s"
		}, {
			"name" : "technorati",
			"url" : "https://technorati.com/search?return=posts&authority=high&q=%s"
		}, {
			"name" : "youtube",
			"url" : "https://www.youtube.com/results?search_query=%s"
		}, {
			"name" : "ebay",
			"url" : "https://shop.ebay.com/?_nkw=%s&_sacat=See-All-Categories"
		}, {
			"name" : "imdb",
			"url" : "https://www.imdb.com/find?s=all&q=%s"
		}, {
			"name" : "google encrypted",
			"url" : "https://encrypted.google.com/search?hl=en&q=%s"
		}, {
			"name" : "wolfram alpha",
			"url" : "https://www.wolframalpha.com/input/?i=%s"
		}, {
			"name" : "yahoo",
			"url" : "https://search.yahoo.com/search?fr=crmas&p=%s"
		}, {
			"name" : "pinterest",
			"url" : "https://pinterest.com/search/?q=%s"
		}];