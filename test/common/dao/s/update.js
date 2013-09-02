// JavaScript Document
var s=require("../../s.js");
//console.log(dao);
var p={ 
		method:"update",
		table:"user2",
		obj:{"id":"249","name":"郑黎明","type":11,"value":1,"dep":"sxgk"},
	};
var result=s(p);
console.log(result);