module.exports=function(param,callback){
	//console.log("test.sum handler param:");
	//console.log(param);
	var a=parseInt(param.a);
	var b=parseInt(param.b);
	callback({flag:true,data:{sum:a+b}});
}
console.log("hello");