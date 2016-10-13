initPage(window);
var isInit = false;
var first= true;

var _dynMap = new dynMap();
function init() {
	_dynMap.initLine();


};
function test(){
	/*eventHandler({code: "KEY_DOWN"});
	return;*/
	var volume= 0;
	if(thisSW_MediaPlayer!= null){
		volume= thisSW_MediaPlayer.getVolume();
	}
	volume= (volume<= 0) ? 15: volume;
	var time= 3000;
	setTimeout(function(){
		if(thisSW_MediaPlayer!= null){
			thisSW_MediaPlayer.setVolume(0);
		}
		eventHandler({code: "KEY_DOWN"});
		first= false;
		setTimeout(function(){
			if(thisSW_MediaPlayer!= null){
				thisSW_MediaPlayer.setVolume(volume);
			}
			eventHandler({code: "KEY_UP"});

			setTimeout(function(){
				eventHandler({code: "KEY_OK"});

				
				test();
				
			}, time);

		}, time);

	},  (first? 0 : time));
	


	//视频播放
	setTimeout(function(){
		iPanel.ioctlWrite("media_cmd_video_pig","0,0,1472,60,437,198");
		iPanel.ioctlWrite("media_localplay_start", "");
	}, time);

}



var ii = 0;
var type = 1;
var door = 1;
var start= 1, end= 8;
var templastinfo = "";// 判断3次连发命令，不变化的话不更新

/**
 * 按键处理
 */
function eventHandler(eventObj) {
	if(!isInit){
		init();
		isInit = true;
	};
	switch (eventObj.code) {
		case "KEY_DOWN": // 下
			if(ii<end)
				ii = ii + 1;
			else
				ii = 1;
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'8','type':'"
					+ type
					+ "','station':'"
					+ ii
					+ "','doorside':'"
					+ door
					+ "'}\"}";
			doEventTest(str);
			break;
		case "KEY_UP": // 上
			
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'8','type':'3','station':'"
					+ ii + "','doorside':'1'}\"}";
			doEventTest(str);
			break;
		case "KEY_LEFT": // 左
			if(ii<26)
				ii = ii + 1;
			else
				ii = 1;
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'8','type':'"
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
			var str = "{'type':'EVENT_REPORT_STATION','message':\"{'id':'0123444983e24','line':'1','start':'1','end':'8','type':'"
				+ type
				+ "','station':'"
				+ ii
				+ "','doorside':'-1'}\"}";
			doEventTest(str);
			break;
		case "KEY_OK": // 确定
			if(door==1){
				door = 2;
			}else{
				door=1;
			}
			var str = '{"type":"EVENT_REPORT_STATION","message":\'{"id":"14115831141542623463","line":"1","start":"1","end":"8","type":"0","station":"1","doorside":"'+door+'"}\'}';
			doEventTest(str);
			break;
		case "KEY_NUMERIC":
			var str = '{"type":"EVENT_REPORT_EMERGENCY","id":"1"}';
			doEventTest(str);
			break;
		case "KEY_BACK":
			break;
		case "KEY_EVENT":
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
				$("error").src="./images/error/"+id+".jpg";
				break;
			case "EVENT_REPORT_STATION":
				thisSW_Stb.PrintLog("进来了");
				$("error").src="./images/none.gif";
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
function doEventTest(str) {
	var obj = null;
	eval("obj = " + str);
	if (obj) {
		switch (obj.type) {
		case "EVENT_REPORT_EMERGENCY":
			var id = obj.id;
			if(id=="")
				id=1;
			$("error").src="./images/error/"+id+".jpg";
			break;
		case "EVENT_REPORT_STATION":
			thisSW_Stb.PrintLog("进来了");
			$("error").src="./images/none.gif";
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
				_dynMap.refreshStation(start, end, type, curstation,door);
			}
			break;
		case "EVENT_ADJUST_TIME":
			window.location.reload();
			break;
		}
	}
};