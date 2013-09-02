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
			if(e.id==1)	return true;
		},
		compare:function(a,b){/**/
			var gap=a.type-b.type;
			if(gap==0)	gap=a.id-b.id;
			return gap;
		},
		pagesize:2,
		pagenum:1
	};
var user=dao.query(q);
console.log(user);