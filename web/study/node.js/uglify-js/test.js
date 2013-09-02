var UglifyJS = require("uglify-js");
//console.log(UglifyJS);

for(var p in UglifyJS){
	console.log(p);
}
//var result = UglifyJS.minify("../minify/a.js");
//console.log(result.code); // minified output
var result = UglifyJS.minify("var b = function () {};", {fromString: true,filename:"a.js"});
console.log(result);
