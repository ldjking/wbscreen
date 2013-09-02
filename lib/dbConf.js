/*允许配置多项数据库连接*/
var db={};
db.ldjjames= {  
    type:"mysql",
    name:"ldjjames",
    max:10,
    host: 'mysql.sql68.cdncenter.net',  
    port: 3306,  
    user: 'sq_ldjjames',  
    password: 'mysqlAdminLDJ',  
    database: 'sq_ldjjames',
    insecureAuth: true
};  
db.local= {  
    type:"mysql",
    name:"local",
    max:10,
    host: 'localhost',  
    port: 3306,  
    user: 'root',  
    password: 'root',  
    database: 'mydb',
    insecureAuth: true
}; 


module.exports=db;