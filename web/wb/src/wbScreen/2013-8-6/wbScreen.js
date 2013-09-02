window.onload=init;
var x=g.base;
eval(expose(x,"x"));/*暴露所有接口*/
var conf={};
var doms=["wb-main","logo","steps","navs","btn-add","btn-save","btn-exit","btn-update","btn-rm","btn-view","paper-index","paper-add","paper-info","paper-grid","paper-evt","form-add","form_info","form-grid","form-evt"];
eval($def(doms));
function init(){/*注册各类事件  加载各类所需模块*/	
	conf.doms=[steps,btn_add,btn_save,btn_exit,btn_update,btn_rm,btn_view,paper_index,paper_add,paper_info,paper_grid,paper_evt];
	initNav();/*初始化导航栏目*/
	regEvts();
} 
function regEvts(){/*注册各类事件  按钮事件 步骤事件 导航事件*/
	btn_add.onclick=addMode;
	btn_save.onclick=savePage;
	btn_exit.onclick=indexMode;
	btn_update.onclick=updatePage;
	btn_rm.onclick=rmPage;
	btn_view.onclick=viewPage;
	
	navs.onclick=navClick;
	
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
	//btn_save.className="icon-ok";
	logo.innerHTML="新增页面";
}

function editMode(){
	//console.log("editMode");
	clsAdd(conf.doms,"hide");
	//console.log(btn_save);
	clsRm([btn_update,btn_rm,btn_view,btn_exit,steps,paper_info],"hide");
	
	clsAdd([wb_main,navs],"full");


	logo.innerHTML=conf.currPage.cname;
	
	var data=json("pagedef/"+conf.currPage.name);
	console.log("page def data:");
	console.dir(data);
	fillForm(form_info,data);
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
		window.open("http://localhost/web/page/"+page.name+".html");
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
		
		if(dom.type=="text"){
			data[name]=dom.value;
		}
		else if(dom.type=="radio"&&dom.checked){
			data[name]=dom.value;
		}
	}
	console.log(data);
	return data;
}

function fillForm(form,data){
	var inputs=$("input",form);
	//console.log(inputs);
	//console.log(form);
	for(var i=0;i<inputs.length;i++){
		var dom=inputs[i];
		//console.log(dom);
		var name=dom.name;
		if(data[name]!=null){
			if(dom.type=="text"){
				dom.value=data[name];
			}
			else if(dom.type=="radio"){
				if(dom.value==data[name]){
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
	
}

function fillEvtForm(){/*填充事件内容*/
	
}