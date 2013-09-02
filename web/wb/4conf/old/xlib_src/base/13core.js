/*xlib.13core		核心函数 hitch绑定函数上下文  mix复合数据  clone克隆数据  jsonStr*/
var x=require("base/12extend.js");
x.hitch=function(){/*连接函数  绑定上下文  绑定参数*//*参数  第一个应该是一个函数 要求该函数符合规范的写法  后面紧跟着各个参数*/
	var args=arguments;
	var obj=args[0];
	var fn=args[1];
	if(!x.isFun(fn))	return;/*如果该值不是函数  直接返回 false*/
	var merge=function(args1,args2){
		var result=[];
		for(var i=2,j=0;i<args1.length+args2.length;i++){
			if(args1[i]===undefined){/*如果该参数未定义*/
				if(j<args2.length)	result.push(args2[j]);/*使用第二个实参来填充*/
				j++;
			}
			else{
				if(i<args.length)	result.push(args1[i]);
				else{ 
					if(j<args2.length){/*第二个实参还没遍历完*/
						result.push(args2[j]);
						j++;
					}
				}
			}
		}
		return result;
	}
	return function(){
		var args2=arguments;
		var argsArray=merge(args,args2);
		return fn.apply(obj,argsArray);
	}
}
x.objTrans=function(obj,attrMap){/*对对象进行变换，得到的是一个新对象*/
	var obj2=x.mix(null,obj);/*数据的变形*/
	if(attrMap!=null){
		var attrs=attrMap.split(/\,|\:/g);/*这里应该是一个键值对*/
		for(var i=0;i<attrs.length;i=i+2){
			var attr1=attrs[i];
			var attr2=attrs[i+1];
			delete obj2[attr1];/*删除旧属性*/
			obj2[attr2]=obj[attr1]/*添加新属性*/
		}
	}
	return obj2;
}

/*数据部分  主要负责数据格式转换  数据对比*/
x.mix=function(obj1,obj2,override){/*复制一个对象到另外一个对象  只复制数据部分   要求两个参数是普通对象*/
	/*1	如果obj1是数组  
		1.1	obj2是对象	将obj2加进来数组中  
		1.2	obj2是数组	将obj2逐个加进数组
		1.3	obj2是直接值	不处理
	  2 如果obj1是对象
	  	2.1	obj2是对象	将obj2的每个属性加进obj1
		2.2	obj2是数组	将obj2逐个加进
		2.3	obj2是直接值	不处理*/
	if(x.isArray(obj2)){
		x.arrayEach(obj2,function(e,i,array){x.mix(obj1,e,override,refAttrs);});
	}
	else if(obj2 instanceof Object){
		if(obj1==null) obj1={};/*mix总会返回一个数据*/			
		if(x.isArray(obj1)){/*如果是数组*/
			obj1.push(obj2)
		}
		else if(obj1 instanceof Object){
			for(var p in obj2){
				if(obj1[p]==null||override){/*如果自身没有  或者要求重载 */
					obj1[p]=obj2[p];/*直接引用这个值*/
				}
			}
		}
	}
	return obj1;
}

x.clone=function(obj,datas,clones){/*克隆一个对象*/
	datas=datas?datas:[];clones=clones?clones:[];
	var result=null;
	if(datas.indexOf(obj)>=0){/*如果已经包含这个对象   这时候不应该返回obj   而应该返回obj克隆出来的对象*//*;////out("发现重复！");*/
		var i=datas.indexOf(obj); /*IE8 不支持 indexof 不支持这个方法 你妈的*/
		return clones[i];/**/
	}
	
	if(obj){/*如果不为空*/
		if(x.isArray(obj)){/*如果是数组*/
			result=[];
			datas.push(obj);
			clones.push(result);

			for(var i=0;i<obj.length;i++)	result[i]=x.clone(obj[i],datas,clones);
		}
		else if(obj instanceof Object){/*如果是简单对象*/
			result={};
			datas.push(obj);
			clones.push(result);
			
			for(var p in obj)	result[p]=x.clone(obj[p],datas,clones);
		}
		else{/*如果是dom相关的  或者是简单数值  返回直接值  不需要再做保存*/
			result=obj;
		}
	}
	return result;
}

var storage={};
/*如果使用的是对象  应该把对象给Json化吗*/
x.memory=function(fn,fnName){/*记忆函数  返回一个新函数  带有记忆的功能  哈哈*/
	return function(){
		var key=fnName+"_"+arguments.length+"+"+JSON.stringify(arguments);
		if(storage[key]!=null){
			console.log("exist:"+key);
			return storage[key];
		}
		else{
			return storage[key]=fn.apply(this,arguments);
		}
	}
}

return x;

