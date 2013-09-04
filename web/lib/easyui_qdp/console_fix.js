 if (Function.prototype.bind && console && typeof console.log == "object") {
	var array=["log","info","warn","error","assert","dir","clear","profile","profileEnd"];
	array.forEach(function (method) {
			console[method] = this.call(console[method], console);
		}, Function.prototype.bind);
}
console.log("fix console");
/*code fix_console end______*//*! jQuery v@1.8.0 jquery.com | jquery.org/license */
