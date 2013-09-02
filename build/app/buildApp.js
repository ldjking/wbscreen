function build(app){/*appname*/
	/*step1 取html文件  app目录下的index.html*/

	/*2分析index.html内容  解析出css 资源引用*/

	/*3解析出div#app 下的内容  解析出div#app的样式*/

	/*4解析出 javascript 的资源引用
		 1.require.js
		 2.内联的脚本	var g=require("a.js");	g.run();   必须要传一个dom 或者是dom id
		 3.从内联的脚本中发现问题，可以注册到 模块定义中
	*/

	/*5 build要把2，3，4注册进regist.json文件*/

	/*app注册的数据格式  类型[2] 名称 描述  js  css  html是最后一项*/

}