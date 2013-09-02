var add=require("../pageAdd.js");
var page={
		name:"person3",
		cname:"人员管理",
		title:"人员管理",
		module:"人员机构",
		content:"hello world",
		template:"t1",
		isNew:true,
		base:"D:/Documents/GitHub/webScreen/"
	};
add(page,cb);

function cb(result){
	console.log(result);
}