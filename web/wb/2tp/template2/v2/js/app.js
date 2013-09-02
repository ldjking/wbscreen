window.onload=init;
var selectRow=null;
var activeRow=null;
var formInEdit=null;
function init(){
	initTab();
	initGrid();
	initButton();
	
}
function initTab(){
	tab_list=$("#tab_list");
	tab_form=$("#tab_form");

	grid=$("#main_grid");
	form=$("#main_form");


	tab_list.onclick=function(){		

		listMode();
	}
	tab_form.onclick=function(){
		formMode();
	}
	console.log("init tab");
}

function listMode(){
	cssToggle([tab_list,grid],"normal","active");
	cssToggle([tab_form,form],"active","normal");
}

function formMode(){
	cssToggle([tab_list,grid],"active","normal");
	cssToggle([tab_form,form],"normal","active");
}

function addMode(){
	formMode();
	formInEdit=false;
	
	cssRm("#btn_save","disable");
	cssRm("#txt_id","disable");
	$("#txt_id").readOnly=false;
	
	clearForm("#main_form");
}

function editMode(){
	formMode();
	formInEdit=true;
	
	cssRm("#btn_save","disable");
	fillForm("#main_form",selectRow);

}


function doSave(){
	console.log("doSave");
	var url="common/save";
	if(formInEdit)	url="common/update";
	
	var obj=collectForm("#main_form");
	var param={
				table:"user",
				obj:obj
			};
	var result=ajax(url,param,true);
	console.log(result);	
}



function doRemove(){
	var result=ajax("common/remove",{table:"user",obj:selectRow});
	console.log("remove result:");
	console.log(result);
}


function initButton(){
	bind("#btn_save","click",doSave);
	bind("#btn_remove","click",doRemove);
	bind("#btn_add","click",addMode);


}


function initGrid(){
	
	var gridConf={
			url:"common/query",
			param:{
				table:"user",
				joins:[{table:"dep",attr:"dep"}],
				pagenum:1,
				pagesize:10
			}
		}
	makeGrid("#grid",gridConf);
}