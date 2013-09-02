console.log("example read json");
var fs=require("fs");
//console.log(fs);

fs.readFile("./pageA.json",{encoding:"utf8"},function(err,data){
	console.log("error:"+err);
	var obj=JSON.parse(data);
	console.log("data:");
	console.log(obj);
	/**/
});