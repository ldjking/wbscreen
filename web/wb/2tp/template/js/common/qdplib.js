/**
 * 通用js脚本
 */
/**
 * 根据参数名获取地址中对应的请求参数 
 * walker 2013-5-21
 * @param name 参数名
 * @returns 参数值
 */
function getUrlParam(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) 
	return unescape(r[2]); 
	return null; 
}
/**
 * 检查当前页面元素可用性
 * walker 2013-5-27
 * 用法：如果需要控制按钮状态
 * 1、请为toolbar按钮设定与页面元素表中一致的id；
 * 2、在datagrid的onLoadSuccess事件中执行checkElementsStatus(obj)，obj为datagrid的id；
 * @param obj grid的id
 */
function checkElementsStatus(obj){
	$.post(getContextPath()+"/elementAccess/elements.do",{meunsId:getUrlParam("menuid")},function(ht){
		var data = JSON.parse(ht);//eval('(' + ht + ')');
		if(data.rows.length>0){
			
			for(var i=0;i<data.rows.length;i++){
				//与当前页面按钮做匹配，如果匹配上则使此按钮可用
				//matchElement(obj,data.rows[i].CODE_TABLE_ITEM,data.rows[i].STRATEGYID);
				matchElement(obj,data.rows[i].CODE_TABLE_ITEM);
			}
		}
	});
}
/**
 * 匹配页面元素按钮，如果匹配上则启用（默认按钮均为禁用）并设置属性BID
 * walker 2013-5-27
 * 调用方法：这里为元素绑定码值，当前元素获取此属性可以运用$(this).attr("BID")的方式获取，
 * 其他按钮如果要取得此参数可以通过$("#"+obj).attr("BID")的方式，obj为toolbar中按钮id
 * @param obj datagrid的id
 * @param key 元素id（码值）
 */
function matchElement(obj,key){
	var op=$("#"+obj).datagrid("options");
	var tol=op.toolbar;
	
	for(var ii=0;ii<tol.length;ii++){
		if(tol[ii].id=="btn_"+key || tol[ii].id==key){
			$("#"+tol[ii].id).attr({BID:key}).linkbutton("enable");
			break;
		}
	}
}




function validate() {
	$.extend($.fn.validatebox.defaults.rules, { 
		//LOV编码是否唯一
		lovUnique: {
	    	validator: function(value){
	    		var isUnique = true;
			    $.post('${pageContext.request.contextPath}/listofvalues/LovUnique.do?code='+$('#code').val(), function(result){
			    	var data = eval('(' + result + ')');
			    	if(data.ID!=undefined){
			    		isUnique = false;
			    	}
			    	return isUnique;
			    });
	    	},
	        message: 'LOV编码已存在！'
	    },
		//参数编码是否唯一
	    paramUnique: {
	        validator: function(value){
	        	var isUnique = true;
	            return isUnique;
	        },
	        message: '参数编码已存在！'
	    },
	    //验证参数列表中是否有sql语句中的参数
	    paramDgValidate: {
	    	validator: function(value){
	    		var isValidate = true;
				return isValidate;
	    	},
	        message: 'sql语句中的参数与参数列表中不一致'
	    },
	    //元素编码是否唯一
	    codeUnique: {
	    	validator: function(value){
	    		var paramRows = $('#dg1').datagrid("getRows");
	    		var isUnique = true;
	    		for(var i = 0;i<paramRows.length;i++){
	    			if(value == paramRows[i]["PROGRAMS_ELEMENT_CODE"]&&dg1EditIndex!=i){
	    				isUnique = false;
	    				break;
	    			}
	    		}
	    		return isUnique;
	    	},
	    	message: '元素编码已存在！'
	    },
	    //程序编码是否唯一
	    programCodeUnique: {
	    	validator: function(value){
			    $.post('${pageContext.request.contextPath}/qdpProgramsTs/resultlist.do?code='+$('#code').val(), function(result){
			    	var data = eval('(' + result + ')');
			    	if(data.success=="true"){
			    		$.messager.alert('提示','程序编码已经存在!','info');
			    	}
			    });
	    	}
	    }
	});
}

//获取工具栏按钮信息
function getToolbar() {
	var responseTest;
	var url = getContextPath()+"/qdpPrgrmsBtnTs/buttons.do?pragramcode="+getUrlParam("pagename")+"&menuid="+getUrlParam("menuid");
	var result = $.ajax({
		url : url,
		type : "POST",
		async : false,
		success : function() {
		}
	});
	responseTest = result.responseText;

	var data = eval('(' + responseTest + ')');
	var map = new Map();
	if(data.rows.length>0){
		var tempCT = data.rows[0].CODE_TABLE;
		var arr =new Array();
		for(var i=0;i<data.rows.length;i++){
			if(data.rows[i].CODE_TABLE!=tempCT){
				tempCT = data.rows[i].CODE_TABLE;
			}
			var btnid = data.rows[i].CODE_TABLE.toString().toLowerCase()+"_"+data.rows[i].CODE_TABLE_ITEM;
			
			var obj = {"id":btnid,"iconCls":"icon-"+data.rows[i].CODE_TABLE_ITEM,"BID":data.rows[i].CODE_TABLE_ITEM,"SID":data.rows[i].STRATEGYID,"text":data.rows[i].DESCRIPTION,"disabled":data.rows[i].BTNSTATUS=="1"?false:true};
			if(map.get(tempCT)){
				arr = map.get(tempCT);
				arr.push(obj);
			}
			else{
				arr =new Array();
				arr.push(obj);
				map.put(tempCT,arr);
			}
		}
	}
	if(map.size()>0){
	   var keyArr = map.keys();
	   toolbar = new Array();
	   for(var j=0;j<keyArr.length;j++){
		   var valArr = map.get(keyArr[j]);
		   toolbar.push($.toJSON(valArr).replace(/\"function/g, "function").replace(/}\"/g, "}"));
	   }
	}
	
	return toolbar;
}

//获得上下文路径，便于相对路径写入
function getContextPath() {
	var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var result = pathName.substr(0,index+1);
	return result;
};

/*
 * MAP对象，实现MAP功能
 *
 * 接口：
 * size()     获取MAP元素个数
 * isEmpty()    判断MAP是否为空
 * clear()     删除MAP所有元素
 * put(key, value)   向MAP中增加元素（key, value) 
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 *
 * 例子：
 * var map = new Map();
 *
 * map.put("key", "value");
 * var val = map.get("key")
 * ……
 *
 */
function Map() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    };

    //判断MAP是否为空
    this.isEmpty = function() {
        return (this.elements.length < 1);
    };

    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    };

    //向MAP中增加元素（key, value) 
    this.put = function(_key, _value) {
    	if(this.elements.length>0){
	    	for (i = 0; i < this.elements.length; i++) {
	          if (this.elements[i].key == _key) {
	               this.elements.splice(i, 1);
	          }
	    	}
    	}
        this.elements.push( {
            key : _key,
            value : _value
        });
    };

    //删除指定KEY的元素，成功返回True，失败返回False
    this.removeByKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    
    //删除指定VALUE的元素，成功返回True，失败返回False
    this.removeByValue = function(_value) {//removeByValueAndKey
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    
    //删除指定VALUE的元素，成功返回True，失败返回False
    this.removeByValueAndKey = function(_key,_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value && this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    };

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    };

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };
    
    //判断MAP中是否含有指定VALUE的元素
    this.containsObj = function(_key,_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value && this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch (e) {
            bln = false;
        }
        return bln;
    };

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    };
    
    //获取MAP中所有VALUE的数组（ARRAY）
    this.valuesByKey = function(_key) {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            if (this.elements[i].key == _key) {
                arr.push(this.elements[i].value);
            }
        }
        return arr;
    };

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    };
    
    //获取key通过value
    this.keysByValue = function(_value) {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            if(_value == this.elements[i].value){
                arr.push(this.elements[i].key);
            }
        }
        return arr;
    };
    
    //获取MAP中所有KEY的数组（ARRAY）
    this.keysRemoveDuplicate = function() {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            var flag = true;
            for(var j=0;j<arr.length;j++){
                if(arr[j] == this.elements[i].key){
                    flag = false;
                    break;
                } 
            }
            if(flag){
                arr.push(this.elements[i].key);
            }
        }
        return arr;
    };
}


/*keymap*/

var Keys={};
var keyMap=[];
for(var i=65;i<=90;i++){  //A-Z
	Keys[String.fromCharCode(i).toLowerCase()]=i;
}
for(var i=1;i<=12;i++){//F1-F12
	Keys["f"+i]=111+i;
}
for(var i=0;i<=9;i++){//0-9
	Keys["n"+i]=48+i;
}
Keys.del=46;/*删除按键*/
Keys.space=32;/*空格按键*/
Keys.enter=13;/*回车按键*/
Keys.esc=27;/*ESC按键*/


window.onkeydown=keyDownHandler;
function keyDownHandler(evt){
	var keyCode=evt.keyCode;
	console.log(keyCode);
	for(var i=0;i<keyMap.length;i++){/*热键遍历*/
		var hk=keyMap[i];
		console.log("hk"+hk);

		if(hk.ctrl^evt.ctrlKey)	continue;/*要求的ctrl不一致*/
		if(hk.alt^evt.altKey)	continue;/*要求的alt不一致*/
		if(hk.shiftKey^evt.shiftKey)	continue;/*要求的shift不一致*/
		if(hk.key==evt.keyCode){/*按键一致 触发事件*/
			var dom=document.getElementById(hk.dom);
			if(dom){
				/*要判断按钮是否disable掉*/
				if(dom.style.display=="none"||dom.className.indexOf("disable")>=0){
					
				}
				else{
					dom.click();
				}
			}
			evt.preventDefault();
			evt.stopPropagation();
			evt.cancelBubble=true;
			evt.returnValue=false;
		}
	}
}

function HotKey(dom,key,ctrl,alt,shiftKey,handler,context){
	this.dom=dom;
	this.key=key;
	this.ctrl=ctrl;
	this.alt=alt;
	this.shiftKey=shiftKey;
	this.handler=handler;
	this.context=context;
}

function installKey(dom,key,ctrl,alt,shiftKey,handler,context){/*安装快捷键*/
	var hk=new HotKey(dom,key,ctrl,alt,shiftKey,handler,context);
	keyMap.push(hk);
}

