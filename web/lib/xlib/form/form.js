//window.onload=init;
var x=g.base;/*常规扩展*/
eval(expose(x,"x"));
function genForm(dom,cfg,data){
	var table=x.$table(cfg.length,1);/*最外层是一个外围table*/
	table.className="form";
	dom.appendChild(table);
	//console.log(dom.innerHTML);
	for(var i=0;i<cfg.length;i++){
		var line=table.rows[i].cells[0];
		line.style.display="";
		line.className="row";
		//console.log(line.outerHTML);
		var tDef=cfg[i];
		genTable(line,tDef);
	}
}

function genTable(line,tDef){
	var row=tDef.rows,col=tDef.cols;
	var table=x.$table(row,col);/*把所有的格子都拿过来装组件*/
	
	line.appendChild(table);
	for(var i=0,j=0;i<tDef.cells.length;){/*普通单行布局*/
		//console.log("tDef:"+tDef);
		//console.log("tDef:"+tDef.cells.length);

		var r=parseInt(j/col);
		var c=parseInt(j%col);
		//console.log("row:"+r+" col:"+c);
		
		var cell=table.rows[r].cells[c];
		cell.style.display="";
		var def=tDef.cells[i];/*单元格定义*/
		
		if(def.width)		cell.style.width=def.width+"px";
		if(def.height)		cell.style.height=def.height+"px";
		if(def.colSpan)		cell.colSpan=def.colSpan;
		if(def.rowSpan)		cell.rowSpan=def.rowSpan;
		if(def.type=="lbl"){/*lbl 标签  输入框  日期  值列表  单选框  多选框*/
			var span=x.$span();
			span.innerHTML=def.text;
			cell.appendChild(span);
		}
		else if(def.type=="text"){
			var input=x.$txt("txt");
			cell.appendChild(input);
		}
		else if(def.type=="radio"){/*单选*/
			var input=x.$txt();
			cell.appendChild(input);
		}
		else if(def.type=="check"){/*多选*/
			var input=x.$txt();
			cell.appendChild(input);
		}
		i++;j++;
	}
}

module.exports=genForm;