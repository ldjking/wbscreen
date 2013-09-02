// JavaScript Document

var fs=require("fs-extra");

var result={id:1,pid:null,name:"root",childs:[],level:1,path:"/web/page"};
var result2=[{name:"root",v:1,path:""}];
var result3=[];
var path="..";

var id=1;

function d(folder,f){
	var path=folder;
	
	var files=fs.readdirSync(path);/*先区分出文件还是目录*/
	var subFolders=[];
	var subFiles=[];
	files.forEach(function(e,i,arr){
		var stats=fs.statSync(path+e);
		if(stats.isDirectory())	subFolders.push(e);
		else	subFiles.push(e);
	})
	
	files=subFolders.concat(subFiles);
	
	files.forEach(function(e,i,arr){
		var c={};
		c.name=e;
		c.level=f.level+1;
		c.id=++id;/*id不能重复*/
		c.pid=f.id;
		c.path=f.path+"/"+c.name;
		result2.push({name:c.name,v:c.level,path:c.path});
		result3.push({id:c.id,name:c.name,pid:c.pid});
		var stats=fs.statSync(path+e);

		if(stats.isDirectory()){
			//console.log("dir:"+f.dir+f.name);
			c.isFolder=true;
			c.childs=[];
			d(path+e+"/",c);
		}
		

		/*这里就要注意顺序了*/
		f.childs.push(c);
	})
}

d("../../web/page/",result);

//fs.writeJsonSync("../../../file/dirA.json",result);

fs.writeJsonSync("./gen/dirWeb.json",result2);

//fs.writeJsonSync("../../../file/dirC.json",result3);

//console.log(JSON.stringify(result));

