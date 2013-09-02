var login=require("./login.js");
login({id:"liu_dongjie",pw:"1"},function(result){
	console.log("test login result:");
	console.log(result);
	process.exit(0);
});