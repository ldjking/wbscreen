// JavaScript Document
/*通过一定的措施  把 11judge,12extend,13core,14dom,15css,16evt的内容整合到all.js上*/
/*确保单个模块的代码不应该超过1000行，如果超过则考虑分拆*/
/*计划用10万行代码  解决日常前端开发中的各类问题*/
/*require就像是import  为了便于测试，所有require的路径都必须是绝对路径或者相对于xlib的相对路径*/
/*掐头去尾
*/
var fs=require("fs");
var opt={encoding:"utf8"};
var f=[];
f[0]=fs.readFileSync("../src/11judge.js",opt );
f[1]=fs.readFileSync("../src/12extend.js", opt);
f[2]=fs.readFileSync("../src/13core.js", opt);
f[3]=fs.readFileSync("../src/14dom.js", opt);
f[4]=fs.readFileSync("../src/15css.js", opt);
f[5]=fs.readFileSync("../src/16evt.js", opt);
f[6]=fs.readFileSync("../src/17ajax.js", opt);

var r=[];
var e=[];
var content="";
//console.log(new RegExp());
var reg1=/module.exports={([\s\S]+)?};/g;
var s=reg1.exec(f[0]);
r[0]=f[0].replace(s[0],"");/*删除掉匹配内容*/
e[0]=RegExp.$1;/*记录捕获内容*/
//console.log(s1);
//console.log(RegExp.$1);
content=r[0];

for(var i=1;i<f.length;i++){
	var del1=/var x=req[\s\S]+?\n/g;
	var del2=/eval\(expose[\s\S]+?\n/g;

	var reg2=/module.exports=mix\(\S+,{([\s\S]+)?}\);/g;
	
	var s=reg2.exec(f[i]);/*符合条件内容*/
	e[i]=RegExp.$1;/*记录捕获内容*/

	r[i]=f[i].replace(s[0],"");
	r[i]=r[i].replace(del1,"");
	r[i]=r[i].replace(del2,"");
	content+=r[i];
}

content+="module.exports={\r\n";
for(var i=0;i<e.length;i++){
	content+=e[i].replace(/\s+$/g,"").replace(/ /g,"")+",\r\n";
}
content+="};";

fs.writeFileSync("../all.js",content,opt);
console.log("build base success!");

//console.log(f2);
//console.log(RegExp.$1);
//f1=f1.replace();
//console.log(f1);