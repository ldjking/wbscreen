// JavaScript Document
var dao=require("../../dao.js");
//console.log(dao);
var q={ 
		table:"user",
		joins:[{
			table:"dep",
			attr:"dep",
			map:{name:"depname"}
		}]
	};
var user=dao.query(q);
console.log(user);