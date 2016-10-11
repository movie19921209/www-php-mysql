/**
 * 按键键值和系统消息值的映射
 */
var Event = {
	mapping : function(__event) {
		var keycode = __event.which || __event.keyCode;
		var code = "";
		var args = {
			modifiers : __event.modifiers,
			value : keycode,
			type : 0
		};
		switch (keycode) {
			case 359:  //字幕键
				code="KEY_SUBTITLE";
				break;
			case 358: //音轨键
				code="KEY_AUDIO";
				break;
			case 271 :
				code = "KEY_SEEK"; //定位键
				break;
			case 1290 :
				code = "KEY_BOOKMARK"; //书签键
				break;
			case 281 :
				code = "KEY_FAV"; //收藏键
				break;
			case 286 :
				code = "KEY_TRACK";//声道键
				break;
			case 288 :
				code = "KEY_KEYBOARD";//软键盘键
				break;
			case 261 :
				code = "KEY_MUTE"; //静音键
				break;
			case 519 :
				code = "KEY_SET"; //设置键
				break;
			case 284 :
				code = "KEY_HELP"; //帮助键
				break;
			case 265 :
				code = "KEY_FBWD";//快退键
				break;
			case 264 :
				code = "KEY_FFWD";//快进键
				break;
			case 263 :
				code = "KEY_PAUSEPLAY";//暂停播放
				break;
			case 270 :
				code = "KEY_STOP";//停止键
				break;
			case 220 :
			case 272 :
				code = "KEY_MENU"; //首页键
				break;
			case 1289 :
				code = "KEY_APPLY"; //应用键
				break;
			case 37 :
				code = "KEY_LEFT";//方向左键
				break;
			case 38 :
				code = "KEY_UP";//方向上键
				break;
			case 39 :
				code = "KEY_RIGHT";//方向右键
				break;
			case 40 :
				code = "KEY_DOWN";//方向下键
				break;
			case 13 :
				code = "KEY_OK"; //确认键
				break;
			case 356:
			case 27:
			case 8 :
			case 46:
				code = "KEY_BACK"; //返回键
				break;
			case 127 :
			case 7 :
				code = "KEY_DELETE";//删除键
				break;
			case 259 :
				code = "KEY_VOLADD"; //音量+
				break;
			case 260 :
				code = "KEY_VOLDEC";//音量-
				break;
			case 33 :
				code = "KEY_PAGEUP"; //上页键
				break;
			case 34 :
				code = "KEY_PAGEDOWN"; //下页键
				break;
			case 0x101:
			case 257 :
				code = "KEY_CHADD"; //频道+
				break;
			case 0x102:
			case 258 :
				code = "KEY_CHDEC";//频道-
				break;
			case 275 :
				code = "KEY_RED";//红色键
				break;
			case 276 :
				code = "KEY_GREEN";//绿色键
				break;
			case 277 :
				code = "KEY_YELLOW";//黄色键
				break;
			case 519:
			case 278 :
			case 219 :
				code = "KEY_BLUE";//蓝色键
				break;
			case 48 :
			case 49 :
			case 50 :
			case 51 :
			case 52 :
			case 53 :
			case 54 :
			case 55 :
			case 56 :
			case 57 :
				code = "KEY_NUMERIC"; //数字键
				args = {
					value : (keycode - 48),
					type : 0
				};
				break;
			case 1057 :
				code = "KEY_STAR";//*键
				break;
			case 85 :
				code = "KEY_OPTION";//菜单键
				break;
			case 105 :
				code = "KEY_#";//#键
				break;
			case 768 :
				code = "KEY_EVENT";//事件模拟按键
				if (window.W) {
					window.W.EventStr = Utility.getEvent();
				}
				break;
		}
		return {
			code : code,
			args : args
		};
	}
};
//每个页面加载必调的方法，用于初始化页面
function initPage(f) {
	//定义一个空的eventHandler函数，这样可以防止在应用上面执行了initPage，但是没有定义eventHandler函数，出现eventHandler找不到的情况
	if (typeof(f.eventHandler) == "undefined") {
		f.eventHandler = function() {
		};
	}
	f.W = window;
	var url = window.location.href;
	var urls = url.split("/");
		urls[urls.length-1] = "../public/image/stb/none.gif";
	f.__IMAGE_NONE = urls.join("/");
	if (f == window) {
		f.document.onkeydown = function(e) {
			if (typeof(eventHandler) != "undefined") {
				var ev = e||event;
				var obj = Event.mapping(ev);
				ev.returnValue = true;
				if (obj.code == "")
					return 2;
				else
					return (eventHandler(obj));
			}else
				return 2;
		};
	} else {
		f.document.onkeypress = function(e) {
			if (typeof(f.eventHandler) != "undefined") {
				var ev = e||event;
				var obj = Event.mapping(ev);
				if (obj.code == "")
					return 2;
				else
					return (f.eventHandler(obj));
			}else
				return 2;
		};
		f.document.onsystemevent = function(e) {
			if (typeof(f.eventHandler) != "undefined") {
				var ev = e||event;
				var obj = Event.mapping(ev);
				if (obj.code == "")
					return 2;
				else
					return (f.eventHandler(obj));
			}else
				return 2;
		};
		f.document.onirkeypress = function(e) {
			if (typeof(f.eventHandler) != "undefined") {
				var ev = e||event;
				var obj = Event.mapping(ev);
				if (obj.code == "")
					return 2;
				else
					return (f.eventHandler(obj));
			}else
				return 2;
		};
	}
}