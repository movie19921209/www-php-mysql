initPage(window);
var isInit = false;


var _dynMap = new dynMap();
function init() {
	_dynMap.initLine();


};
function test(){

	var time= 15000;
	eventHandler({code: "KEY_DOWN"});
	setTimeout(function(){
		eventHandler({code: "KEY_UP"});
			setTimeout(function(){
				test();
			},time);



	}, time);
}



var ii = 0;
var type = 1;
var door = 1;
var templastinfo = "";// 判断3次连发命令，不变化的话不更新

/**
 * 按键处理
 */
function eventHandler(eventObj) {
	if(!isInit){
		init();
		//$("logo").style.display = "none";
		isInit = true;

		//iPanel.ioctlWrite("media_cmd_video_pig","0,0,1461,98,404,240");
		/*setTimeout(function(){
		 iPanel.ioctlWrite("media_localplay_start", "udp://234.0.0.9:9999");
		 }, 1000);*/

	};
	switch (eventObj.code) {
		case "KEY_DOWN": // 下
			if(ii<27)
				ii = ii + 1;
			else
				ii = 1;
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'27','type':'"
				+ type
				+ "','station':'"
				+ ii
				+ "','doorside':'"
				+ door
				+ "'}\"}";
			doEventTest(str);
			break;
		case "KEY_UP": // 上

			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'27','type':'2','station':'"
				+ ii + "','doorside':'"+door+"'}\"}";
			doEventTest(str);
			break;
		case "KEY_LEFT": // 左
			if(ii<26)
				ii = ii + 1;
			else
				ii = 1;
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'27','type':'"
				+ type
				+ "','station':'"
				+ ii
				+ "','doorside':'1'}\"}";
			doEventTest(str);
			break;
		case "KEY_RIGHT": // 右
			if(ii<26)
				ii = ii + 1;
			else
				ii = 1;
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'27','type':'"
				+ type
				+ "','station':'"
				+ ii
				+ "','doorside':'-1'}\"}";
			doEventTest(str);
			break;
		case "KEY_OK": // 确定
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'2','end':'26','type':'2','station':'"
			 + ii + "','doorside':'1'}\"}";

			if(door==1){
				door = 2;
			}else{
				door=1;
			}

			doEventTest(str);
			break;
		case "KEY_NUMERIC":
			var str = '{"type":"EVENT_REPORT_EMERGENCY","id":"1"}';
			doEventTest(str);
			break;
		case "KEY_BACK": // 返回
			break;
		case "KEY_EVENT":// 播控事件处理
			doEvent();
			break;
	}
	;
	return 0;
};

// 处理事件
function doEvent() {
	thisSW_Stb.PrintLog("eventStr  = " + W.EventStr);
	if (W.EventStr && W.EventStr != "") {
		var obj = null;
		eval("obj = " + W.EventStr);
		if (obj) {
			switch (obj.type) {
				case "EVENT_REPORT_EMERGENCY":
					var id = obj.id;
					if(id=="")
						id=1;
					//$("error").src="./images/error/"+id+".jpg";
					break;
				case "EVENT_REPORT_STATION":
					thisSW_Stb.PrintLog("进来了");
					//$("error").src="./images/none.gif";
					var mapinfo = eval("(" + obj.message + ")");
					thisSW_Stb.PrintLog("mapinfo  = " + mapinfo);
					var start = mapinfo.start;
					var end = mapinfo.end;
					var type = mapinfo.type;
					var curstation = mapinfo.station;
					var door = mapinfo.doorside;
					var lastinfo = start + end + type + curstation + door;
					if (lastinfo != templastinfo) {
						templastinfo = lastinfo;
                        if(dynMapTimeout!= -1){
                            window.clearTimeout(dynMapTimeout);
                        }
						_dynMap.refreshStation(start, end, type, curstation,door);
					}
					break;
				case "EVENT_ADJUST_TIME":
					window.location.reload();
					break;
			}
		}
	}
};

// 处理事件
var dynMapTimeout= -1;
function doEventTest(str) {
	var obj = null;
	eval("obj = " + str);
	if (obj) {
		switch (obj.type) {
			case "EVENT_REPORT_EMERGENCY":
				var id = obj.id;
				if(id=="")
					id=1;
				//$("error").src="./images/error/"+id+".jpg";
				break;
			case "EVENT_REPORT_STATION":
				thisSW_Stb.PrintLog("进来了");
				//$("error").src="./images/none.gif";
				var mapinfo = eval("(" + obj.message + ")");
				thisSW_Stb.PrintLog("mapinfo  = " + mapinfo);
				var start = mapinfo.start;
				var end = mapinfo.end;
				var type = mapinfo.type;
				var curstation = mapinfo.station;
				var door = mapinfo.doorside;
				var lastinfo = start + end + type + curstation + door;
				if (lastinfo != templastinfo) {
					templastinfo = lastinfo;
                    if(dynMapTimeout!= -1){
                        window.clearTimeout(dynMapTimeout);
                    }
					_dynMap.refreshStation(start, end, type, curstation,door);
				}
				break;
			case "EVENT_ADJUST_TIME":
				window.location.reload();
				break;
		}
	}
};