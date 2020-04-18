function _getDefault() {
	return {
		effect_text : 0,
		open_type : [0, 1, 0, 1],
		text_type : [0, 0, 0, 0],
		searchEngines : [11, 6, 19, 0],
		effect_link : 1,
		open_type_link : [0, 1, 0, 1],
		link_type : [1, 0, 0, 0],
		linkTextSelect : true
	};
}

var _effect_text = ["\u4E0A\u4E0B\u5DE6\u53F3", "\u4E0A\u4E0B", "\u5DE6\u53F3"];
var _open_type = ["\u524D\u53F0", "\u540E\u53F0"];
var _text_type = ["\u641C\u7D22", "\u590D\u5236"];
var _effect_link = ["\u4E0A\u4E0B\u5DE6\u53F3", "\u4E0A\u4E0B", "\u5DE6\u53F3"];
var _link_type = ["\u6253\u5F00", "\u590D\u5236\u94FE\u63A5url", "\u590D\u5236\u94FE\u63A5\u6587\u672C"];

var _build_in_seach_engines = [{
			"name" : "\u300E\u7F51\u9875\u300FGoogle",
			"url" : "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8"
		}, {
			"name" : "\u300E\u7F51\u9875\u300F\u767E\u5EA6",
			"url" : "https://www.baidu.com/s?wd=%s&ie=utf-8"
		}, {
			"name" : "\u300E\u7F51\u9875\u300F\u5FC5\u5E94",
			"url" : "https://cn.bing.com/search?q=%s"
		}, {
			"name" : "\u300E\u7F51\u9875\u300Fduckduckgo",
			"url" : "https://duckduckgo.com/?q=%s"
		}, {
			"name" : "\u300E\u7F51\u9875\u300F360",
			"url" : "https://www.so.com/s?ie=utf-8&q=%s"
		}, {
			"name" : "\u300E\u7F51\u9875\u300F\u79D8\u8FF9\u641C\u7D22",
			"url" : "https://mijisou.com/?q=%s&category_general=on&time_range=&language=zh-CN"
		}, {
			"name" : "\u300E\u7F51\u9875\u300FDoge\u591A\u5409",
			"url" : "https://www.dogedoge.com/results?q=%s"
		}, {
			"name" : "\u300E\u7FFB\u8BD1\u300F\u6709\u9053\u8BCD\u5178",
			"url" : "http://dict.youdao.com/search?q=%s"
		}, {
			"name" : "\u300E\u7FFB\u8BD1\u300F\u6D77\u8BCD",
			"url" : "http://dict.cn/%s"
		}, {
			"name" : "\u300E\u77E5\u8BC6\u300F\u77E5\u4E4E",
			"url" : "http://www.zhihu.com/search?q=%s"
		}, {
			"name" : "\u300E\u77E5\u8BC6\u300F\u7EF4\u57FA",
			"url" : "http://zh.wikipedia.org/wiki/%s"
		}, {
			"name" : "\u300E\u77E5\u8BC6\u300F\u767E\u5EA6\u767E\u79D1",
			"url" : "http://baike.baidu.com/search/word?pic=1&sug=1&word=%s"
		}, {
			"name" : "\u300E\u77E5\u8BC6\u300Fstackoverflow",
			"url" : "https://stackoverflow.com/search?q=%s"
		}, {
			"name" : "\u300E\u89C6\u9891\u300Fyoutube",
			"url" : "https://www.youtube.com/results?search_query=%s"
		}, {
			"name" : "\u300E\u89C6\u9891\u300Fbilibili",
			"url" : "http://search.bilibili.com/all?keyword=%s"
		}, {
			"name" : "\u300E\u89C6\u9891\u300F\u817E\u8BAF\u89C6\u9891",
			"url" : "https://v.qq.com/x/search/?q=%s"
		}, {
			"name" : "\u300E\u89C6\u9891\u300F\u4F18\u9177",
			"url" : "http://www.soku.com/search_video/q_%s"
		}, {
			"name" : "\u300E\u89C6\u9891\u300F\u7231\u5947\u827A",
			"url" : "http://so.iqiyi.com/so/q_%s"
		}, {
			"name" : "\u300E\u793E\u4EA4\u300FTwitter",
			"url" : "https://twitter.com/search/%s"
		}, {
			"name" : "\u300E\u793E\u4EA4\u300F\u8C46\u74E3",
			"url" : "http://www.douban.com/search?source=suggest&q=%s"
		}, {
			"name" : "\u300E\u793E\u4EA4\u300F\u65B0\u6D6A\u5FAE\u535A",
			"url" : "http://s.weibo.com/weibo/%s"
		}, {
			"name" : "\u300E\u8D2D\u7269\u300F\u6DD8\u5B9D",
			"url" : "http://s.taobao.com/search?q=%s"
		}, {
			"name" : "\u300E\u8D2D\u7269\u300F\u4EAC\u4E1C",
			"url" : "http://search.jd.com/Search?keyword=%s&enc=utf-8"
		}];