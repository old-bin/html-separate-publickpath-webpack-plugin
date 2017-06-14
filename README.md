# html-separate-publickpath-webpack-plugin

separate webpack js/css cdn path, base on html-webpack-plugin

### 
基于 html-webpack-plugin  插件 及 lodash  插件

### 使用方法
var HtmlSeparatePublicPathPlugin = require('html-separate-publickpath-webpack-plugin');
```
// 定义js/css CDN路径
var jsCSSCDNPath = {
	'js' : 'https://js.mafengwo.net/',
	'css' : 'https://css.mafengwo.net/',
};

// plugins 里的使用
plugins: [
	new HtmlSeparatePublicPathPlugin({
		'jsCSSCDNPath' : jsCSSCDNPath,
	}),
]
```