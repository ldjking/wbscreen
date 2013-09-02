module.exports=function(param,callback){
	var pool=require("../../lib/dbPool");/*这里应该使用dbpool获取一个数据库连接*/

	var obj={p:param,c:callback};
	var conn=pool.get("local",getDbBack.bind(obj));
	
}

function getDbBack(conn){
	var param=this.p;
	var callback=this.c;

	var account=param.id;
	var pw=param.pw;

	if(!account)	account="liu_dongjie";
	if(!pw)			pw="1";
	var client=conn.client;

	var sql="select * from c10 where c10_account=? and c10_pw=?";
	client.query(sql,[account,pw],function(err,rows){
		var pool=require("../../lib/dbPool");
		var result={};
		if(err){
			console.log("login error:");
			console.log(err);
			result.flag=false;
			result.err=err;
		}
		else if(rows.length==1){
			//console.log("login result:");
			//console.log(rows);
			result.flag=true;
			result.data=rows[0];
		}
		pool.release(client);
		callback(result);
	});
}