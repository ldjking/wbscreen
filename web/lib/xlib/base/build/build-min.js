// JavaScript Document
/*通过一定的措施  把 11judge,12extend,13core,14dom,15css,16evt的内容整合到all.js上*/
/*确保单个模块的代码不应该超过1000行，如果超过则考虑分拆*/
/*计划用10万行代码  解决日常前端开发中的各类问题*/
/*require就像是import  为了便于测试，所有require的路径都必须是绝对路径或者相对于xlib的相对路径*/
/*掐头去尾
*/
var fs  = require('fs'); 
var UglifyJS = require("uglify-js");


var result = UglifyJS.minify("var b = function () {};", {fromString: true});
var result=UglifyJS.minify("../all.js");

fs.writeFileSync("../all.min.js",result.code,{encoding:"utf8"});
//console.log(result);