var fs = require('fs');

fs.readdir('.',function(err,files){
    if(err) throw err;
    console.log(files);
    for(var i=0;i<files.length;i++){
    	var f=files[i];
    	var stat = fs.statSync(f);
        if(stat.isDirectory()){
            //dirs.unshift(url);//收集目录
			console.log(f+" is directory");
            //inner(url,dirs);
        }else if(stat.isFile()){
            //fs.unlinkSync(url);//直接删除文件
			console.log(f+" is file");
        }
    }
});




