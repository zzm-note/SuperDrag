Edge商店：[下载链接](https://microsoftedge.microsoft.com/addons/detail/nlefalggllbckbaegjonehiokkddgcbn)

### 功能：
> 扩展的主要特性：  
> 支持按键取消和自动取消操作；  
> 支持方向可选：四面八方、上下、左右。四面八方可选斜向和正向；    
> 允许拖拽类型：文字、链接、图片；  
> 文本支持搜索和复制；  
> 文本搜索支持四面八方分别设置前台或后台；  
> 文本搜索预置搜索常用引擎，可自定义；  
> 链接支持打开、复制链接URL、复制链接文本、搜索链接文本；  
> 链接打开方式支持四面八方分别设置前台或后台；  
> 搜索链接文本可选择预置搜索引擎，可自定义。  
> 图片支持打开图片指向网站、打开图片、复制图片、复制图片链接、下载图片、以图搜图；  
> 图片打开方式支持四面八方分别设置前台或后台；  
> 以图搜图可选择预置搜索引擎，可自定义。

### 更新日志：
```
v3.5.0
支持选中文字或链接拖拽生成二维码
fix bugs

v3.4.1
fix bugs
优化代码

v3.4.0
修复拖拽时有概率不触发的问题

v3.3.9
修改一些内置搜索引擎

v3.3.8
1.增加左上、右上、左下、右下的拖拽方向，默认为此项。可选原来的上下左右方向
2.增加复制操作的toast提示

v3.3.7
1.修改拖拽打开标签的顺序，与鼠标中建一致
2.fix bug

v3.3.6
拖拽文本去掉多余添加的“HTTPS”前缀

v3.3.5
改个提示颜色，增加可视度

v3.3.3
1.fix：“自动取消拖拽操作的超时时间”设为0，引发的单个页面多次拖拽打开相同几个页面的错误
2.Doge多吉搜索502，默认值改回百度

v3.3.1
设置默认值

v3.3.0
1.框选链接支持自定义按键
2.其他优化

v3.2.1
优化前台打开框选链接

v3.2.0
修改框选链接打开顺序

v3.1.3
修复框选链接后拖拽功能不可用的问题

v3.1.2
修复框选链接bug
增加实时显示已框选链接数量

v3.1.1
修复框选链接bug

v3.1.0
1.新增框选打开多个链接功能
2.下载图片默认不显示另存为对话框

v3.0.5
更换图标

v3.0.4
1.下载图片增加可选另存为对话框

v3.0.3
1.下载图片增加toast提示，优化下载大图体验

v3.0.2
1.修复某些类型的文本链接拖拽失效

v3.0.1
1.修复打开图片指向网站错误

v3.0.0
1.新增“图片类型”拖拽功能
2.修复http网站不能复制的问题

v2.0.5
Optimize code

v2.0.4
1.新增“搜索链接文本”功能
2.取消横向拖拽选择链接文本功能，可按住Alt键选择链接文本
3.其他优化

v2.0.3
1.增加临时取消拖拽操作的按键(alt)
2.增加拖拽过程中自动取消拖拽操作的超时时间
3.其他
```

### 背景：
1. 不需要鼠标手势，只需要拖拽操作
2. edge商店还没一个好用的纯拖拽扩展，之前是到chrome商店下载[Yet Another Drag and Go](https://chrome.google.com/webstore/detail/yet-another-drag-and-go/hnoonkgmmnklbdehoepdjcidhjbncjmi)。但是对于某些情况下下载不太方便，而且功能也有限。
3. 其实更喜欢firefox商店的[闪耀拖拽](https://addons.mozilla.org/zh-CN/firefox/addon/glitterdrag/)。功能自定义更加强大。

基于以上，选择自己开发一个。

### 借鉴：
[uSuperDrag](https://github.com/iorate/uSuperDrag)  
[Yet Another Drag and Go FIX](https://github.com/jerry74/yadng)  
[闪耀拖拽](https://addons.mozilla.org/zh-CN/firefox/addon/glitterdrag/?src=search)  
[Linkclump](https://chrome.google.com/webstore/detail/linkclump/lfpjkncokllnfokkgpkobnkbkmelfefj)

### LICENSE：
MIT
