function build(base,name){/*编译某个文件*/
	var ejs = require('ejs'), fs = require('fs-extra');

	var def=base+"/file/pagedef/"+name+".json";
	//console.log(ejs);
	var data=fs.readJsonSync(def);
	var temp=data.template;
	// console.log(obj);
	//console.log(data.template);
	//temp="";
	var template=fs.readFileSync(base+"/file/pageTemp/"+temp+".ejs", 'utf8');

	var html = ejs.render(template, data);
	fs.writeFileSync(base+"/web/page/"+name+".html", html,'utf8');/*输出到page目录下*/
	//console.log(html);
	console.log("ejs build page "+name+" success!");
}

module.exports=build;