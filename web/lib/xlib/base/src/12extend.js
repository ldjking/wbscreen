var x=require("11judge.js");
eval(expose(x,"x"));

/*根据ES5 修正浏览器javascript 的功能  主要指es3的功能*/

function dtFormat(format,date,flag){/*格式化日期*/
	if(date==null)	date=new Date();
	var f=[	"yyyy-mm-dd","hh:MM:ss","SSS","yyyy-mm-dd hh:MM:ss","hh:MM:ss SSS","yyyy-mm-dd hh:MM:ss SSS"];
	if(format==null) 		format=f[5];
	else if(format==1) 		format=f[0];
	else if(format==2)		format=f[1];
	else if(format==3)		format=f[2];
	else if(format==12)		format=f[3];
	else if(format==23)		format=f[4];
	else if(format==123)	format=f[5];
	
	var o ={"y+" : date.getFullYear(), /*month   */
			"m+" : date.getMonth()+1, /*month   */
			"d+" : date.getDate(),    /*day   */
			"h+" : date.getHours(),   /*hour   */
			"M+" : date.getMinutes(), /*minute   */
			"s+" : date.getSeconds(), /*second   */
			"q+" : Math.floor((date.getMonth()+3)/3), 	/*quarter   */
			"S+" : date.getMilliseconds() /*millisecond   */}   
	for(var k in o)
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1, o[k]); 
		}
	return format;   
}
function dtToday(){/*获取今日是哪一天 星期几*/
	var now=new Date();
	var date=new Date();
	var today=dtFormat("yyyy年mm月dd日");
	var num=date.getDay(date);
	var weekdays=["日","一","二","三","四","五","六"]
	return today+" 星期"+weekdays[num];
}
function str2Num(str){
	if(isStr(str)){
		var str2=str.replace(/[^0-9|\.|\-]/g,"");//还要判断是否是数字格式
		//;////out("toNumStr:["+str+"]:["+str2+"]");
		var num=0;
		if(str2=="")	return 0;
		try{
			if(str2.indexOf(".")>0)	num=parseFloat(str2);
			else					num=parseFloat(str2);
		}catch(e){
			num=0;
		} 
		return num;
	}
	if(isNum(str))	return str;
	else				return 0;
}
function numLimit(v,v_min,v_max){/*限制数据*/
	if(v_min>v_max){
		var temp=v_min;
		v_min=v_max;
		v_max=temp;
	}
	if(v<v_min)	return v_min
	else if(v>v_max)	return v_max;
	return v;
}

function contain(array1,array2){/*array1 包含array2*/
	array2.every(function(e){return array1.indexOf(e)>=0});
}

module.exports=mix(x,{
		dtFormat:dtFormat,
		dtToday:dtToday,
		str2Num:str2Num,
		numLimit:numLimit
	}
);

