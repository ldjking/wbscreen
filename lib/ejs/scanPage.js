/*扫描整个文件夹，将扫描后的文件汇总成一个索引文件*/
module.exports=function(base){
	var fs=require("fs-extra");
	var folder=base+"/file/pagedef/"
	var files=fs.readdirSync(folder);
	var opt={encoding:"utf8"};
	//console.log(files);

	var data=[];

	for(var i=0;i<files.length;i++){
		var file=fs.readJsonSync(folder+files[i]);
		//console.log(file);
		var obj={};
		obj.name=file.name;
		obj.cname=file.cname;
		obj.template=file.template;
		obj.module=file.module;
		obj.id=file.id;
		data.push(obj);
	}

	data=data.sort(function(a,b){if(a.id>b.id) return 1;else if(a.id==b.id) return 0;else return -1});
	//console.log("after sort");
	//console.log(data);

	fs.writeJsonSync(base+"/file/pages.json",data,opt);
	console.log("页面定义扫描完成，生成索引字典！");
}