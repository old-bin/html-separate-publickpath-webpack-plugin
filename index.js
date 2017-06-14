'use strict';
var _ = require('lodash');

function HtmlSeparatePublicPathPlugin (options) {
  // Default options
  this.options = _.extend({
	jsCSSCDNPath : {},
  }, options);
}

HtmlSeparatePublicPathPlugin.prototype.apply = function (compiler) {
  	var jsCSSCDNPath = this.options.jsCSSCDNPath;
  	if(jsCSSCDNPath === {}) return ;

  	var replacePath = function(filename, publicPath) {
		var ext = filename.match(/\.([^\.]+)$/);
		if(!ext || !ext.length || ext.length < 2) return filename;
		ext = ext[1];
		var host = jsCSSCDNPath[ext] ? jsCSSCDNPath[ext] : '';

		filename = host ? filename.replace(publicPath, host) : filename;

		return filename;
	};

	var filterData = function(htmlPluginData) {
		var publicPath = htmlPluginData.assets.publicPath;
		var js = htmlPluginData.assets.js;
		var css = htmlPluginData.assets.css;
		var assetJson = htmlPluginData.plugin.assetJson;
		
		js = js.map(function(filename) {
			return replacePath(filename, publicPath);
		});

		css = css.map(function(filename) {
			return replacePath(filename, publicPath);
		});

		// assetJson json，为string 类型
		assetJson = JSON.parse(assetJson);
		assetJson = assetJson.map(function(filename) {
			return replacePath(filename, publicPath);
		});
		assetJson = JSON.stringify(assetJson);

		htmlPluginData.assets.js = js;
		htmlPluginData.assets.css = css;
		htmlPluginData.plugin.assetJson = assetJson;
		return htmlPluginData;
	};

  	compiler.plugin('compilation', function(compilation) {
	    compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
  			htmlPluginData = filterData(htmlPluginData);
  			// console.log(htmlPluginData);
	      	callback(null, htmlPluginData);
	    });
	});
};


module.exports = HtmlSeparatePublicPathPlugin;
