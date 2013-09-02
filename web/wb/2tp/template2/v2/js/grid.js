// JavaScript Document
(function(win){
	win.makeGrid=function(dom,cfg){/*makegrid  */
		/*cfg里要有url   pagesize  pagenum*/
		if(isStr(dom))	dom=$(dom);
		console.log("make grid");
		var result=ajax(cfg.url,cfg.param);
		//console.log(result);
		//var copy=dom.rows[1];
		for(var i=0;i<result.data.length;i++){
			var obj=result.data[i];
			var tr=dom.rows[1].cloneNode(true);
			tr.className="";
			dom.appendChild(tr);
			tr.obj=obj;
			bind(tr,"click",rowClick);
			bind(tr,"dblclick",rowDbl);

			var divs=$("div",tr);
			for(var j=0;j<divs.length;j++){
				var e=divs[j];
				var attr=e.getAttribute("attr");
				if(attr!=null&&obj[attr]!=null)	e.innerHTML=obj[attr];
			}
		}
		$("#totalnum").innerHTML=result.total?result.total:result.data.length;
		$("#currpage").innerHTML=cfg.param.pagenum;
		$("#totalpage").innerHTML=Math.ceil(result.total/cfg.param.pagesize);
	}
	
	function rowClick(){
		selectRow=this.obj;
		/*该显示的按钮要显示出来*/
		cssRm("#btn_edit","disable");
		cssRm("#btn_remove","disable");
		cssRm("#btn_pre","disable");
		cssRm("#btn_next","disable");
		
		if(activeRow!=null)	cssRm(activeRow,"select");
		activeRow=this;
		cssAdd(activeRow,"select");
	}
	
	function rowDbl(){/*进入编辑模式*/
		editMode();
	}
	
	
	function init(){
	}
	
	function pageNext(){
	}
	
	function pagePre(){
	}
	
	function pageFirst(){
	}
	
	function pageLast(){
	}
	
	function doSort(){
	}
	
	function doFilter(){
	}
})(window);