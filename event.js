//跨浏览器处理    Cai  20170723 

var EventUtil={
	//添加事件处理程序
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false)
		}else if(element.attachEvent){
			element.attachEvent(on + type, handler)
		}else{
			element['on' + type] = handler;
		}
	},
	//移除事件处理程序
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	},
	//返回event对象的引用
	getEvent:function(event){
		return event?event:window.event;
	},
	//获取事件的目标
	getTarget:function(event){
		return event.target||event.srcElement;
	},
	//取消事件默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	//阻止事件冒泡
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	},
	//获取相关元素信息，鼠标移入、移除
	getRelatdTarget:function(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
	},
	//获取鼠标按钮对象，鼠标左键0、右键2、滚轮1
	getButton:function(event){
		if(document.implementation.hasFeature('MouseEvents','2.0')){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	}
}

//创建XMLHttpRequest
function createXHR(){
	//ie7及以上
	if(typeof XMLHttpRequest!="undefined"){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject!="undefined"){//ie7以下
		if(typeof arguments.callee.activeXString!="string"){
			var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
			for(i=0,len=versions.length;i<len;i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString=versions[i];
					break;
				}catch(ex){
					//跳过
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new Error("not XHR object available!");
	}
}

//跨浏览器的CORS(跨域源资源共享)
function createCORSRequest(method,url){
	var xhr=new XMLHttpRequest();
	if('withCredentials' in xhr){
		xhr.open(method,url,true);
	}else if(typeof XDomainRequest != 'undefined'){
		xhr=new XDomainRequest();
		xhr.open(method,url);
	}else{
		xhr=null;
	}
	return xhr;
}
//var request=createCORSRequest('get','http://somewhere-else.com/page/');
//if(request){
//	request.onload=function(){
//		console.log(request.responseText);
//	}
//	request.send();
//}


