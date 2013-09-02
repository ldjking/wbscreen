/*xlib.21animation		动画类*/
var x=require("base/15css.js");
function am_rate(b,g){/*b是时间 总次数//引入v和s的概念*/
	var s=b*g/4*b;//平均速度乘以时间
	var s2=[];
	var r=[];
	for(var t=1;t<=b;t++){
		if(t<=b/2)	{s2[t]=g*t*t/2;}
		else{
			var d=t-b/2;
			s2[t]=g*b*b/8+g*b*d/2-g*d*d/2;
		}
		r[t]=s2[t]/s;
	}
	return r;
}

function Animation(conf){/*高级动画，允许执行自定义函数 自定义函数能够产生效果并判断是否中止  这个动画的run操作里可以自定义自身*/
	this.runState=false;
	this.timer=null;	/*一个动画只能保持一个定时器*/
	this.tasks=[];		/*一个动画里可以有多项任务 每个task里是*/	
	var _interval=23;	/*执行间隔*/
	this.conf=conf;		/*配置文件  可以配置的属性包括执行间隔  执行完的回调函数*/
	if(conf&&conf._interval)	_interval=conf._interval;
	this.run=function(cfg){/*run方法要求提供 fun*/
		//console.log("animate start running!");
		this.runState=true;
		if(cfg){
			cfg.excuteTime=null;
			if(cfg.time==null)	cfg.time=600;
			//if(isIE)	var _time=cfg.time*0.5;
	
			cfg.totalTime=Math.floor(cfg.time/_interval);
			cfg.rates=am_rate(cfg.totalTime,10);//总次数 和加速度
			/*总执行次数*/
			this.tasks.push(cfg);/*将动画参数装到任务中去*/
			if(this.timer==null){
				var _this=this;
				this.timer=setInterval(function(){_this.run()},_interval);/*按照间隔执行*/
			}
			return this;
		}
		var cfg=this.tasks[0];/*获取第一项任务*/
		if(cfg.excuteTime==null){/*首次执行该任务*/
			cfg.excuteTime=0;
			cfg._delay=cfg.delay;//另外保存一个延迟			
		}
		if(x.isNum(cfg._delay)){
			cfg._delay-=_interval;
			if(cfg._delay>0){/*仍然处于延迟期间*/
				return this;
			}
		}
		cfg.excuteTime++;/*每次执行事件增加*///然后执行用户自定义函数，fun能够自动执行
		if(x.isFun(cfg.fun)){
			var result=cfg.fun(cfg);//执行这个特效
			if(result==true){//返回true代表终结/
				cfg.excuteTime=null;
				this.tasks.shift();//删除掉顶部
				if(cfg.callBack){//如果执行完还有触发事件
					cfg.callBack();
				}
			}
		}
		if(this.tasks.length==0){/*结束任务*/
			clearInterval(this.timer);
			this.timer=null;
			this.runState=false;
		}
		return this;
	}
	this.pause=function(){/*暂停事件的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
	}
	this.start=function(){/*启动事件*/
		var _this=this;
		this.timer=setInterval(function(){_this.run()},_interval);
	}
	this.clear=function(){/*清除动画的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
		this.tasks=[];
	}
}


function _getDegree(value){
	/*单位分为几种  1 deg  2px  3 %  4 rgb*/
	if(value==null)	return "";
	var degree=value.replace(/[0-9|\.|\-]/g,"");
	//("degree"+degree);
	return degree;
}


function fnSetCss(cfg){/*暂时不支持颜色  不支持transform  如何支持transform,rotateY*/
	var rate=cfg.rates[cfg.excuteTime];
	for(var p in cfg.endCss){
		if(p=="transform"){/*变形的处理	*/
			var startTr=cfg.startCss[p];/*需要知道起始值和结束值*/
			var endTr=cfg.endCss[p];

			var currTr={};
			for(var z in endTr){/*又是各种值*/
				var value1=startTr[z];
				var value2=endTr[z];
				/*每个属性都可以变化*/
				var degree=_getDegree(value1);
				var v1=x.str2Num(value1);
				var v2=x.str2Num(value2);
	
				var value=v2-v1;/*gap*/
				var currValue=value*rate+v1;
				//console.log("transform["+z+"] currValue="+currValue+" degree:"+degree);
				currTr[z]=currValue+degree;
			}
			x.cssTransform(cfg.dom,null,currTr);
		}
		else{
			var value1=cfg.startCss[p];
			var value2=cfg.endCss[p];
			/*每个属性都可以变化*/
			var degree=_getDegree(value1);
			var v1=x.str2Num(value1);
			var v2=x.str2Num(value2);

			var value=v2-v1;/*gap*/
			var currValue=value*rate+v1;
			//console.log("style["+p+"]currValue:"+currValue);
			cfg.dom.style[p]=currValue+degree;
			/*对象的变化	引发layout change事件*/
			if(x.layoutChange)	x.layoutChange(cfg.dom);
		}
	}
	if(rate>=1){
		return true;//隐藏
	}
}
x.cssAnimate=function(dom,startCss,targetCss,duration,delay,fn){/*固定时间的动画与循环动画*/
	console.log("css animate");
	var a=dom._animate;
	if(a==null)	dom._animate=a=new Animation();
	var currCss={};
	for(var p in targetCss){
		currCss[p]=x.styleCurr(dom)[p];
	}
	if(startCss!=null){/*利用额外的做补充*/
		for(var p in startCss){
			currCss[p]=startCss[p];
		}
	}
	var cfg={dom:dom,fun:fnSetCss,startCss:currCss,endCss:targetCss,delay:delay,time:duration,callBack:fn};
	a.run(cfg);
	return dom;
}

x.Animation=Animation;

return x;

