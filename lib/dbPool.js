var mysql=require("mysql");
var conf=require("./dbConf");

console.log("db conf:");
//console.log(conf);
var pool={};

function Conn(db,client,state){
	this.db=db;
	this.client=client;
	this.state=state;
}

function init(db){
	db.conns=[];
	if(db.max==null)	db.max=5;
	for(var i=0;i<db.max;i++){
		var client=mysql.createConnection(db);
		var conn=new Conn(db,client,1);/*1代表可用 0代表不可用 数据库出错后要尝试修复*/
		db.conns.push(conn);
	}
}

function checkQueue(){/*检查请求队列  如果队列不为空 执行顶部回调函数*/

}

pool.get=function(name,callback){/*获取一个数据库连接  这里也应该是异步的  并不一定有足够的数据库连接  控制的是数据库的并发数*/
	if(name==null)	name="default";
	if(conf[name]!=null){
		var db=conf[name];
		if(db.conns==null)	init(db);
		for(var i=0;i<db.conns.length;i++){
			var conn=db.conns[i];
			if(conn.state==1){
				callback(conn);
				return;
			}
		}

		if(db.stack==null) db.stack=[];
		db.stack.push(callback);/*请求回调数组*/
	}
}

pool.release=function(conn){/*释放一个数据库连接*/
	conn.state=1;/*可用状态*/
}

pool.destroy=function(){

}

module.exports=pool;