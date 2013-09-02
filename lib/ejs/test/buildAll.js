var fs=require("fs-extra");
var build=require("../build.js");
var base="D:/Documents/GitHub/webScreen/"
var files=fs.readdirSync(base+"/file/pagedef");
//console.log(files);
for(var i=0;i<files.length;i++){
	build(base,files[i].replace(".json",""));
}