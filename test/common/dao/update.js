// JavaScript Document
var dao=require("../../../handler/common/dao.js");
//console.log(dao);
var p={ 
		table:"user",
		obj:{"id":"101","name":"郑黎明22","type":11,"value":1,"dep":"sxgk"},
	};
var result=dao.update(p);
console.log(result);