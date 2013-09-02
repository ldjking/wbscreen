function getAllFiles(root) {
  var fs=require("fs");
  var result = [], files = fs.readdirSync(root)
  files.forEach(function(file) {
    var pathname = root+ "/" + file
      , stat = fs.lstatSync(pathname)
    if (stat === undefined) return
 
    // 不是文件夹就是文件
    if (!stat.isDirectory()) {
      result.push(pathname)
    // 递归自身
    } else {
      result = result.concat(getAllFiles(pathname))
    }
  });
  return result;
}


function monitor(path){
  var fs=require("fs");
  var files=getAllFiles(path);
  files.forEach(function(file){
    file=file.replace(/\//g,"\\");
    console.log("watch file:"+file);
    fs.watchFile(file,fileChange.bind(file));
  })
}


function fileChange(curr,prev){
    var file=this;

    var cache=require.cache[file];
    if(cache){
      console.log("cache exsit ["+file+"]");
      delete require.cache[file];
    }
    //console.log("file change");
    console.log("file ["+this+"] changed "+curr.mtime);
}

module.exports=monitor;