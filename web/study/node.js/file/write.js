var fs = require('fs');

fs.writeFile('./c.txt',"我\n和\n\t你\t共同点  ",{encoding:"UTF8"},function(err){
    if(err) throw err;
});

