window.onload=init;
var x=g.base;
eval(expose(x,"x"));/*暴露所有接口*/
var conf={};
var doms=["wb-main","logo","steps","navs","btn-add","btn-save","btn-exit","btn-update","btn-rm","btn-view","paper-index","paper-add","paper-edit1","paper-edit2","paper-edit3","form-add","form_edit1","form-edit2",
"step1","step2","step3","step4","step5"];
eval($def(doms));
function init(){/*注册各类事件  加载各类所需模块*/	
	conf.doms=[steps,btn_add,btn_save,btn_exit,btn_update,btn_rm,btn_view,paper_index,paper_add,paper_edit1,paper_edit2,paper_edit3];
	initNav();/*初始化导航栏目*/
	regEvts();
	conf.activeStep=step1;
} 
function regEvts(){/*注册各类事件  按钮事件 步骤事件 导航事件*/
	btn_add.onclick=addMode;
	btn_save.onclick=savePage;
	btn_exit.onclick=indexMode;
	btn_update.onclick=updatePage;
	btn_rm.onclick=rmPage;
	btn_view.onclick=viewPage;
	
	navs.onclick=navClick;
	steps.onclick=stepClick;
	
	window.onkeydown=keyDown;

}
function initNav(){/*初始化导航部分*/
	var datas=json("pages");
	console.dir(datas);
	for(var i=1;i<8;i++){
		var target=$("#item"+i);
		target.innerHTML="";/*清空*/
	}

	for(var i=0;i<datas.length;i++){
		var data=datas[i];
		console.log(data.name+" module:"+data.module);

		var target=$("#item"+data.module);

		var li=$e("li");
		var a=$e("a");
		a.href="#";
		a.innerHTML=data.cname;
		li.obj=data;
		target.appendChild(li);
		li.appendChild(a);
	}
	/*要求默认展开第一个模块*/
}
function form2Json(dom){
	
}

function navClick(evt){
	var target=evt.target;
	if(target.getAttribute("href")=="#"){
		var pageName=target.innerHTML;
		conf.currPage=target.parentNode.obj;
		editMode();
		evtStop(evt);
	}
	else if(target.tagName.toLowerCase()=="a"){
		var target=$(target.getAttribute("href"));

		if(conf.activeModule!=null&&conf.activeModule!=target){
			conf.activeModule.className="";
		}
		target.className="active";
		conf.activeModule=target;
		evtStop(evt);
	}
}

function stepClick(evt){
	var target=evt.target;
	
	if(target.tagName.toLowerCase()=="li"&&target!=conf.activeStep){
		conf.activeStep.className="a1";
		target.className="a2";
		conf.activeStep=target;
		
		/*对应去切换不同的paper paper-edit1 paper-edit2 pager-edit3*/
		var index=str2Num(target.id);
		//alert(index);
		for(var i=1;i<5;i++){
			var paper=$("#paper-edit"+i);
			if(i==index)	clsRm(paper,"hide");
			else			clsAdd(paper,"hide");
		}
		
	}
}

function indexMode(){
	//alert("index mode");
	logo.innerHTML="WBScreen";
	clsAdd(conf.doms,"hide");
	clsRm([btn_add,paper_index],"hide");
	clsRm([wb_main,navs],"full");

	//clsRm([btn_add],"hide");

}

function addMode(){
	//alert("add mode");
	clsAdd(conf.doms,"hide");
	//console.log(btn_save);
	clsRm([btn_save,btn_exit,paper_add],"hide");
	clsAdd([navs,wb_main],"full");
	
	clearForm(form_add);
	//btn_save.className="icon-ok";
	logo.innerHTML="新增页面";
}

function editMode(){
	//console.log("editMode");
	clsAdd(conf.doms,"hide");
	//console.log(btn_save);
	clsRm([btn_update,btn_rm,btn_view,btn_exit,steps,paper_edit1],"hide");
	
	clsAdd([wb_main,navs],"full");
	step1.className="a2";
	step2.className="a1";
	step3.className="a1";
	step4.className="a1";
	conf.activeStep=step1;
	
		
	clearForm(form_edit1);
	clearForm(form_edit2);
	
	logo.innerHTML=conf.currPage.cname;
	
	var data=json("pagedef/"+conf.currPage.name);
	conf.currPageData=data;
	//console.log("page def data:");
	//console.dir(data);
	fillForm(form_edit1,data);
	if(data.conf)	fillForm(form_edit2,data.conf);/*如果已经有grid配置*/
	/*从后台读取currPage的*/
}

function savePage(){
	//alert("savePage");
	var data=formData(form_add);
	data.conf=null;
	/*需要为data生成id,便于排序*/
	var result=ajax("page/pageAdd",data);
	console.log(result);
	conf.currPage=data;
	if(result.flag){
		initNav();/*重新初始化导航并直接进入该页面的编辑模式*/
		editMode();
	}
}
function updatePage(){/*更新页面 其实可以不需要*/
	//alert("updatePage");
	var data=conf.currPageData;
	var gridDef=formData(form_edit2);/*这里应该是配置信息  暂时是考虑直接写文件*/
	data.conf=gridDef;
	console.log("gridDef::::");
	console.dir(gridDef);
	var result=ajax("page/pageUpdate",data);
	console.log(result);
	if(result.flag){
		try{
			if(conf.win)	conf.win.location="http://localhost/web/page/"+page.name+".html";
			else 	conf.win=window.open("http://localhost/web/page/"+page.name+".html");
		}catch(err){
		}
	}
	//conf.currPage=data;
	//if(result.flag){
		//initNav();/*重新初始化导航并直接进入该页面的编辑模式*/
		//editMode();
	//}
	//console.dir(data);
	
	//data.conf=null;
//	/*需要为data生成id,便于排序*/
//	var result=ajax("page/pageAdd",data);
//	console.log(result);
//	conf.currPage=data;
//	if(result.flag){
//		initNav();/*重新初始化导航并直接进入该页面的编辑模式*/
//		editMode();
//	}
}
function rmPage(){/*删除页面*/
	//alert("rmPage");
	var data={name:conf.currPage.name};
	var result=ajax("page/pageRm",data);
	if(result.flag){
		initNav();
		indexMode();
	}
	
}
function viewPage(){/*预览页面*/
	//alert("viewPage");
	var page=conf.currPage;
	if(page&&page.name){
		conf.win=window.open("http://localhost/web/page/"+page.name+".html");
	}
}

function keyDown(evt){/*键盘事件  1f2 填充*/
	var code=evt.keyCode;
	if(code>=113&&code<=115){
		if(code==113)	fillAddForm();
		if(code==114)	fillGridForm();
		if(code==115)	fillEvtForm();
		evtStop(evt);
	}
}

function formData(form){
	var inputs=$("input",form);
	var data={};
	//console.log(inputs);
	//console.log(form);
	for(var i=0;i<inputs.length;i++){
		var dom=inputs[i];
		//console.log(dom);
		var name=dom.name;
		var p=name.indexOf("#");
		if(p>0){
			var tr=dom.parentNode.parentNode;
			var a1=name.substr(0,p);
			var a2=name.substr(p+1);
			var index=$index(tr)-1;
			if(data[a1]==null)	data[a1]=[];
			var array=data[a1];
			if(array[index]==null)	array[index]={};
			
			if(dom.type=="text"){
				array[index][a2]=dom.value;
			}
			else if(dom.type=="radio"&&dom.checked){
				array[index][a2]=dom.value;
			}
		}
		else{
			if(dom.type=="text"){
				data[name]=dom.value;
			}
			else if(dom.type=="radio"&&dom.checked){
				data[name]=dom.value;
			}
			else if(dom.type=="checkbox"&&dom.checked){
				data[name]=true;
			}
		}
	}
	//console.log(data);
	return data;
}

function fillForm(form,data){
	var inputs=$("input",form);/*固定格子的情况下可以这个来填充格子内容*/
	var flag=true;
	//console.log(inputs);
	//console.log(form);
	for(var i=0;i<inputs.length;i++){
		var dom=inputs[i];
		//console.log(dom);
		var name=dom.name;
		var p=name.indexOf("#");
		if(p>0&&flag){
			var table=dom.parentNode.parentNode.parentNode;
			var attr=name.substr(0,p);
			console.log("attr="+attr);
			fillChild(table,data,attr);
			flag=false;/*只执行一次*/
		}
		else{
			if(data[name]!=null){
				if(dom.type=="text"){
					dom.value=data[name];
				}
				else if(dom.type=="radio"){
					if(dom.value==data[name]){
						dom.checked=true;
					}
				}
				else if(dom.type=="checkbox"){
					console.log("find checkbox!!!");
					console.dir(dom);
					if(dom.value==data[name]){
						dom.checked=true;
					}
					if(data[name]==true){
						dom.checked=true;
					}
				}
			}
		}
	}
}

function fillChild(table,data,attr){
	console.log("fill grid!");
	var childs=table.childNodes;/**/
	var trs=[];
	for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType==1)	trs.push(childs[i]);
	}
	if(data[attr]==null)	return;
	for(var i=0;i<data[attr].length;i++){
		//var j=i+1;
		if(i==0){
			fillRow(trs[i+1],data[attr][i]);
		}
		else{
			var cloneTr=trs[1].cloneNode(true);
			table.appendChild(cloneTr);
			fillRow(cloneTr,data[attr][i]);
		}
	}
	console.log(table);
}

function fillRow(row,data){
	//alert("fill Row!!");
	var inputs=$("input",row);/*固定格子的情况下可以这个来填充格子内容*/
	var flag=true;
	
	for(var i=0;i<inputs.length;i++){
		var dom=inputs[i];	
		var name=dom.name;
		var name=name.substr(name.indexOf("#")+1);	
		if(data[name]!=null){
			if(dom.type=="text"){
				dom.value=data[name];
			}
			else if(dom.type=="radio"){/*多项值里面选一个*/
				if(dom.value==data[name]){
					dom.checked=true;
				}
			}
			else if(dom.type=="checkbox"){
				console.log("find checkbox!!!");
				console.dir(dom);
				if(dom.value==data[name]){
					dom.checked=true;
				}
				if(data[name]==true){
					dom.checked=true;
				}
			}
		}
	}
}

function fillAddForm(){/*填充新增表单内容*/
	console.log("fill add form!!");
	var po={name:"po",cname:"合同管理",title:"合同管理",module:4,template:"t1",
			person1:"罗惠恒",time1:"2013-5-1 09:00",des1:"合同管理需求",
			person2:"刘东杰",time2:"2013-5-3 17:30",des2:"合同管理开发"
			};
	fillForm(form_add,po);
}

function fillGridForm(){/*填充数据列表内容*/
	console.log("fill grid form!!");
	var wf={title:"所有工作流程",width:800,height:480,dataUrl:"wf.json",
			collapsible:true,singleSelect:true,fit:true,
			cols:[
				{name:"流程ID",field:"id",width:100},
				{name:"流程名称",field:"name",width:160},
				{name:"流程版本",field:"type",width:100},
				{name:"启用时间",field:"starttime",width:150}
			]};
	fillForm(form_edit2,wf);
}

function fillEvtForm(){/*填充事件内容*/
	console.log("fill grid form!!");
	var wf={title:"合同清单",width:800,height:480,dataUrl:"po.json",
			collapsible:true,singleSelect:true,fit:true,
			cols:[
				{name:"合同ID",field:"id",width:100},
				{name:"合同名称",field:"name",width:160},
				{name:"甲方",field:"companya",width:100},
				{name:"乙方",field:"companyb",width:150},
				{name:"签订时间",field:"starttime",width:150},
				{name:"生效时间",field:"effecttime",width:150},
				{name:"结束时间",field:"endtime",width:150}
			]};
	fillForm(form_edit2,wf);
}

function clearForm(dom){
	var inputs=$("input",dom);/*固定格子的情况下可以这个来填充格子内容*/
	for(var i=0;i<inputs.length;i++){
		var input=inputs[i];
		if(input.type=="text")	input.value="";
		else	input.checked=false;
	}
	/*清理表单的时候确保子表只有一条数据*/
	var childTable=$("#childTable");
	for(var i=2;i<childTable.rows.length;i++){
		var row=childTable.rows[i];
		row.parentNode.removeChild(row);
	}
}