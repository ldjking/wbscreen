var fs = require('fs');
fs.readFile('./a.txt',{encoding:"UTF8"},function(err,data){
    if(err) throw err;
    console.log(data);
});