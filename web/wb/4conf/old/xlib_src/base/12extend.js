/*xlib.12extend 扩展的方法  主要是扩展字符串、数组、日期函数、数组遍历each函数*/
var x=require("base/11judge.js");
x.strSub=function(str,num1,num2){/*子串*/
	var result=null;
	if(x.isStr(str)){
		if(x.isNum(num1)&&x.isNum(num2))	result=str.substr(num1,num2);
		else if(x.isNum(num1)){
			if(num1>=0) result=str.substr(num1);
			else		result=str.substr(str.length+num1);
		}
		else if(x.isStr(num1)){
			var p=str.indexOf(num1);
			if(p>=0){
				if(num2)	result= str.substr(p+1);
				else		 result= str.substr(0,p);
			}
			else{/*不存在该字符串*/
				if(num2)	return null;
				else		return str;
			}
		}
	}
	return result;
}
x.dtFormat=function(format,date,flag){/*格式化日期*/
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
x.dtToday=function(){/*获取今日是哪一天 星期几*/
	var now=new Date();
	var date=new Date();
	var today=x.dtFormat("yyyy年mm月dd日");
	var num=date.getDay(date);
	var weekdays=["日","一","二","三","四","五","六"]
	return today+" 星期"+weekdays[num];
}
x.str2Num=function(str){
	if(x.isStr(str)){
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
	if(x.isNum(str))	return str;
	else				return 0;
}
x.numLimit=function(v,v_min,v_max){/*限制数据*/
	if(v_min>v_max){
		var temp=v_min;
		v_min=v_max;
		v_max=temp;
	}
	if(v<v_min)	return v_min
	else if(v>v_max)	return v_max;
	return v;
}
x.arrayCopy=function(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		result.push(array[i]);
	}
	return result;
}
x.arrayAdd=function(array,obj,p,distinct){/*add本身并不具有去重功能*/
	if(distinct){
		var index=array.indexOf(obj);
		if(index<0)	array.push(obj);/*不存在则插入*/
	}
	else{
		if(x.isNum(p))	array.splice(p,0,obj);/*在指定位置插入*/
		else 			array.push(obj);/*在末尾插入*/
	}
	return array;
}
x.arrayMerge=function(array1,array2,distinct){/*合并两个数组 至数组A中*/
	for(var i=0;i<array2.length;i++){
		x.arrayAdd(array1,array2[i],null,distinct);
	}
	return array1;
}


x.arrayDistinct=function(array){/*应该是直接删除这个位置的元素*/
	var data=[];
	if(x.isArray(array)&&array.length>0){
		for(var i=0;i<array.length;i++){
			var obj=array[i];
			if(data.indexOf(obj)<0)	data.push(obj);
		}
	}
	return data;
}
x.arrayContain=function(array1,array2,full){/*两个数组是否存在包含关系  全包含  包含 两种*/
	if(x.isArray(array1)&&x.isArray(array2)){
		for(var i=0;i<array2.length;i++){
			if(full){
				if(array1.indexOf(array2[i])<0)	return false;/*在B中发现不被A包含的的元素*/
			}
			else{
				if(array1.indexOf(array2[i])>=0)	return true;/*在B中发现被A包含的的元素*/
			}
		}
		if(full)	return true;
		else		return false;
	}
	return false;
}
x.arraySort=function(array,attr){/*按照属性来对数据进行排序   只能按照一个属性进行排序  能否按照多个属性进行排序  能否指定 desc和asc*/
	var compare=function(a,b){
		for(var p in attr){
			var value1=a[p];
			var value2=b[p];
			var asc=attr[p];
			if(value1>value2){
				if(asc)	return 1;
				else 	return -1;
			}
			else if(value1==value2){/*如果最终没有返回呢*/
				continue;
			}
			else{
				if(asc)	return -1;
				else	return 1;
			}
		}
		return 0;
	}
	return array.sort(compare);
}
x.arrayRm=function(array,obj){/*删除数组中的某个元素*/
	var p=array.indexOf(obj);/*寻找一个元素然后把它删掉*/
	while(p>=0){
		array.splice(p,1);
		p=array.indexOf(obj);
	}
	return obj;/*即便删除不成功 依然返回此元素  删除的可能不止一个元素啊*/
}
x.arrayEach=function(array,fun){/*对数组内所有元素执行fun函数  直到fun函数返回true为止*/
	if(x.isFun(fun)){
		for(var i=0;i<array.length;i++){
			var result=fun(array[i],i,array);/*标准调用格式  element index  array*/
			if(result===true)	break;
		}
	}
	return array;/*each执行完返回array*/
}
return x;

