// JavaScript Document
var dao=require("../../dao.js");
//console.log(dao);
var q={ 
		table:"user",
		joins:[{
			table:"dep",
			attr:"dep",
			map:{name:"depname"}
		}],
		filter:function(e,i){
			if(i%2==0&&i<10)	return true;
		}
	};
var user=dao.query(q);
console.log(user);