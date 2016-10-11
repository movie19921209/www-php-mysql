function RndNum(n) {
	var rnd = "";
	for(var i = 0; i < n; i++)
	rnd += Math.floor(Math.random() * 10);
	return rnd;
}

if( typeof iPanel == "undefined") {
	iPanel = {
		ioctlRead : function(str) {
			return "";
		},
		ioctlWrite : function() {
		},
		mainFrame : window,
		setGlobalVar : function() {
		},
		getGlobalVar : function() {
			return "";
		}
	};
}
if(typeof Utility == "undefined") {
	Utility = {
		get : function(str) {
			return "";
		},
		set : function() {
		},
		setGlobalVar : function() {
		},
		getGlobalVar : function() {
			return "";
		}
	};
}

var thisSW_MediaPlayer = (function() {
	var mp = null;
	if( typeof MediaPlayer == "object" || typeof MediaPlayer == "function") {
		mp = new MediaPlayer();
		mp.bindNativePlayerInstance(0);
		mp.setSingleOrPlaylistMode(0);
		mp.setVideoDisplayMode(0);
		mp.setAllowTrickmodeFlag(0);
		mp.setVideoDisplayMode(0);
		mp.setNativeUIFlag(0);
		return {
			fspeed : 2.0,
			rspeed : -2.0,
			play : function(playurl, nofull) {// 播放
				var url = '[{mediaUrl:"' + playurl + '",mediaCode: "code1",mediaType:2,audioType:1,videoType:1,streamType:1,drmType:1,fingerPrint:0,copyProtection:1,allowTrickmode:1,startTime:0,endTime:0,entryID:"entry1"}]';
				mp.setSingleMedia(url);
				if( typeof nofull == "undefined" || nofull == "false")
					mp.setVideoDisplayMode(1);
				mp.playFromStart();
				this.fspeed = 2.0;
				this.rspeed = -2.0;
			},
			stop : function() {// 停止
				mp.stop();
				this.fspeed = 2.0;
				this.rspeed = -2.0;
			},
			pause : function() {// 暂停
				mp.pause();
				this.fspeed = 2.0;
				this.rspeed = -2.0;
			},
			resume : function() {// 恢复正常播放
				mp.resume();
				this.fspeed = 2.0;
				this.rspeed = -2.0;
			},
			fastForward : function() {// 快进
				mp.fastForward(this.fspeed);
				this.rspeed = -2.0;
				if(this.fspeed < 32) {
					this.fspeed = this.fspeed * 2;
				} else {
					this.fspeed = 2.0;
				}
			},
			fastRewind : function() {// 快退
				mp.fastRewind(this.rspeed);
				this.fspeed = 2.0;
				if(this.rspeed > -32.0) {
					this.rspeed = this.rspeed * 2;
				} else {
					this.rspeed = -2.0;
				}
			},
			setPig : function(x, y, w, h) {
				mp.setVideoDisplayArea(x, y, w, h);
				mp.setVideoDisplayMode(0);
				mp.refreshVideoDisplay();
			},
			setFullScreen : function() {
				mp.setVideoDisplayMode(1);
				mp.refreshVideoDisplay();
			},
			getPlaybackMode : function() {
				var jsonMode = mp.getPlaybackMode();
				jsonMode = jsonMode.replace("x", "");
				thisSW_Stb.PrintLog("jsonMode=====" + jsonMode);
				eval("jsonMode=" + jsonMode);
				var playStatus = jsonMode.PlayMode;
				if(playStatus == "Stop")
					return 0;
				if(playStatus == "Pause")
					return 1;
				if(playStatus == "NormalPlay"||playStatus == "Normal Play")
					return 2;
				if(playStatus == "Trickmode")
					return 3;
				return -1;
			},
			getVolume : function() {
				var vol = mp.getVolume();
				return parseInt(vol, 10);
			},
			setVolume : function(volTemp) {
				mp.setVolume(volTemp);
			},
			getCurrentPlayTime : function() {
				return mp.getCurrentPlayTime();
			},
			getMediaDuration : function() {
				return mp.getMediaDuration();
			},
			addVolume : function() {//音量加
				var vol = mp.getVolume();
				if(vol + 3 <= 100) {
					mp.setVolume(vol + 3);
				}
			},
			decVolume : function() {//音量减
				var vol = mp.getVolume();
				if(vol - 3 >= 0) {
					mp.setVolume(vol - 3);
				}
			},
			playByTime : function(time, speed) {
				this.fspeed = 2.0;
				this.rspeed = -2.0;
				thisSW_Stb.PrintLog("playByTime time=" + time + " speed=" + speed);
				mp.playByTime(1, time, speed);
			}
		}
	} else
		return null;
})();
/*
 * 控制接口对象thisSW_Stb
 */
var thisSW_Stb = (function() {
	return {
		getAttr : function(varName)// 获取全局变量函数
		{
			if( typeof (iPanel) == "object")
				return iPanel.getGlobalVar(varName) || "";
			return "";
		},
		setAttr : function(varName, varValue)// 设置全局变量函数
		{
			if( typeof (iPanel) == "object")
				iPanel.setGlobalVar(varName, varValue);
		},
		PrintLog : function(logvalue)// 打印函数
		{
			if( typeof (logvalue) == "string")
				this.Write("log_print", "" + logvalue);
			//console.debug(logvalue);
		},
		Read : function(para, save)// 读函数
		{
			if( typeof (para) == "string") {
				var temp = "";
				// this.getAttr( para );
				if( typeof (temp) != "string" || temp == "" || temp == "unknow") {
					if( typeof (iPanel) == "object")
						temp = iPanel.ioctlRead(para);
					else if(para == "mac")
						temp = "00:07:63:14:46:15";
				}
				if( typeof (save) != "undefined" && parseInt(save, 10) == 1) {
					this.setAttr(para, temp);
				}
				return temp;
			} else {
				this.PrintLog(" Para error!");
				return "";
			}
		},
		GetLanguage : function()//简体中文 zh-cn  英文 en  繁体中文 zh-tw
		{
			var lang = this.Read("language");
			if( typeof lang == "string")
				lang = lang.toLowerCase();
			this.PrintLog("==get language is :" + lang);
			return lang;
		},
		SetLanguage : function(lang)//简体中文 zh-cn  英文 en  繁体中文 zh-tw
		{
			if( typeof lang == "string" && lang != "") {
				this.PrintLog("==set language is :" + lang);
				this.Write("language", lang + "");
			} else
				this.PrintLog("set language is Error");
		},
		Write : function(cmd, para, save)// 写函数
		{
			if( typeof (cmd) == "string" && typeof (para) == "string") {
				if( typeof (save) != "undefined" && parseInt(save, 10) == 1) {
					this.setAttr(cmd, para);
				}
				if( typeof (iPanel) == "object")
					return iPanel.ioctlWrite(cmd, para + "");
				return ""
			} else {
				this.PrintLog("Not find para!");
				return "";
			}
		}
	};
})();
//语种界面管理对象
var thisStyle = (function() {
	var __LANGUAGE = {
		"zh-cn" : 0,
		"zh" : 0,
		"en" : 1,
		"zh-tw" : 2
	};
	//0 中文，1 英文，2 其他语言
	var lang = thisSW_Stb.GetLanguage();
	//语种
	var Language_Id = 0;
	if( typeof __LANGUAGE[lang] != "undefined")
		Language_Id = __LANGUAGE[lang];
	var Styles = [];
	return {
		ReloadLang : function() {
			var lang = thisSW_Stb.GetLanguage();
			//语种
			if( typeof __LANGUAGE[lang] != "undefined")
				Language_Id = __LANGUAGE[lang];
		},
		AddStyle : function(k)//object 或参数 key ，array[zh,en,ar]
		{
			var tmp = arguments;
			var obj = {
				key : "",
				con : []
			}
			if(tmp.length == 1 && typeof tmp[0] == "object") {
				var k = tmp[0];
				for(var i in k) {
					obj[i] = k[i];
				}
			} else {
				if(tmp[0])
					obj.key = tmp[0];
				if(tmp[1])
					obj.con = tmp[1];
			}
			if(obj.key != "") {
				Styles[obj.key] = obj;
				return true;
			}
			return false;
		},
		GetValue : function(key) {

			//thisSW_Stb.PrintLog("CStyle GetValue("+key+") ====start===");
			var ret = "";
			if( typeof Styles[key] == "object") {
				ret = Styles[key].con[Language_Id];
			}
			if(!ret) {
				ret = null;
				thisSW_Stb.PrintLog("Can't find " + key + " and languageid = " + Language_Id);
			}
			//thisSW_Stb.PrintLog("CStyle GetValue("+key+") ===="+ret);
			return ret;
		}
	};
})();
//===============对象扩展============
String.prototype.trim = (function() {
	var A = /^\s+|\s+$/g;
	return function() {
		return this.replace(A, "")
	}
})();
String.prototype.startWith = function(str) {
	if( typeof str == "string")
		return this.indexOf(str) == 0;
	else
		return false;
};
String.prototype.endWith = function(str) {
	if( typeof str == "string")
		return this.lastIndexOf(str) == (this.length - str.length);
	else
		return false;
};
Date.prototype.format = function(A) {
	if(!A)
		A = "yyyy/MM/dd HH:mm:ss.SSS";
	var year = this.getFullYear();
	var month = this.getMonth();
	var sMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
	var sWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var date = this.getDate();
	var day = this.getDay();
	var hr = this.getHours();
	var min = this.getMinutes();
	var sec = this.getSeconds();
	var daysInYear = Math.ceil((this - new Date(year, 0, 0)) / 86400000);
	var weekInYear = Math.ceil((daysInYear + new Date(year, 0, 1).getDay()) / 7);
	var weekInMonth = Math.ceil((date + new Date(year, month, 1).getDay()) / 7);
	return A.replace(/yyyy/g, year).replace(/yy/g, year.toString().substr(2)).replace(/dd/g, (date < 10 ? "0" : "") + date).replace(/HH/g, (hr < 10 ? "0" : "") + hr).replace(/KK/g, (hr % 12 < 10 ? "0" : "") + hr % 12).replace(/kk/g, (hr > 0 && hr < 10 ? "0" : "") + (((hr + 23) % 24) + 1)).replace(/hh/g, (hr > 0 && hr < 10 || hr > 12 && hr < 22 ? "0" : "") + (((hr + 11) % 12) + 1)).replace(/mm/g, (min < 10 ? "0" : "") + min).replace(/ss/g, (sec < 10 ? "0" : "") + sec).replace(/SSS/g, this % 1000).replace(/a/g, (hr < 12 ? "AM" : "PM")).replace(/W/g, weekInMonth).replace(/F/g, Math.ceil(date / 7)).replace(/EEE/g, sWeek[day].substring(0, 3)).replace(/E/g, sWeek[day]).replace(/D/g, daysInYear).replace(/w/g, weekInYear).replace(/MMMM/g, sMonth).replace(/MMM/g, sMonth.substring(0, 3)).replace(/MM/g, (month < 9 ? "0" : "") + (month + 1));
};
Array.prototype.remove = function(A, isIdx) {
	if(this.length <= 0)
		return;
	if( typeof A == "number" && isIdx === true) {
		if(A >= 0 && A < this.length) {
			this.splice(A, 1);
		}
	} else {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == A) {
				this.splice(i, 1);
				break;
			}
		}
	}
}

Array.prototype.del=function(n) {//n表示第几项，从0开始算起。
	//prototype为对象原型，注意这里为对象增加自定义方法的方法。
	if(n<0)//如果n<0，则不进行任何操作。
		return this;
	else
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	/*
	　　　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
	　　　　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
	　　 　　　　　　组成的新数组，这中间，刚好少了第n项。
	　　　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
	　　*/
}
//===============公共函数===============
//格式化文件大小
function formatSize(size, unit) {
	var ret = "";
	var size = parseInt(size, 10);
	var units = ["B", "K", "M", "G", "T"];
	var idx = 0;
	for(var i = 0; i < units.length; i++) {
		if(unit.toUpperCase() == units[i]) {
			idx = i;
			break;
		}
	}
	if(idx == (units.length - 1))
		return size + units[units.length - 1];
	else {
		var tmp = size;
		while(tmp > 1024) {
			tmp = parseFloat(tmp / 1024);
			idx++;
			if(idx >= (units.length - 1))
				break;
		}
		ret = formatFloat(tmp, 1) + units[idx];
	}
	return ret;
}

/**
 * 截取浮点数给定位小数
 * 第一个参数为浮点数，第二个参数为小数位数(默认1)
 * @return {}
 */
function formatFloat() {
	var A = arguments[0];
	var B = arguments[1] || 1;
	var K = Math.pow(10, B);
	var tmp = (parseFloat(A) * K + 0.5) / K;
	var ret = "" + tmp;
	ret = ret.substring(0, ret.indexOf(".") + 1 + B);
	return ret;
};
function objectToJson(obj){
	 var A = obj;
  var isArray = function(v){
      return v && typeof v.length == 'number' && typeof v.splice == 'function';
  }
  var isDate = function(v){
       return v && typeof v.getFullYear == 'function';
  }
  var pad = function(n) {
      return n < 10 ? "0" + n : n
  };
  var W = "";
  if (typeof A == "object") {
      if (isArray(A)) {
          for (var i = 0; i < A.length; i++) {
              if (typeof A[i] == "object")
                  W += (W == "" ? "" : ",") + objectToJson(A[i]);
              else if (typeof A[i] == "string")
                  W += (W == "" ? "" : ",") + "\"" + A[i].replace("\"", "\\\"") + "\"";
              else if (typeof A[i] == "number" || typeof A[i] == "boolean")
                  W += (W == "" ? "" : ",") + A[i] + "";
          }
          W = "[" + W + "]";
      } else if (isDate(A)) {
          W += "\"" + A.getFullYear() + "-" + pad(A.getMonth() + 1) + "-" + pad(A.getDate()) + "T" + pad(A.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + "\""
      } else {
          for (var p in A) {
              if (typeof A[p] == "object")
                  W += (W == "" ? "" : ",") +"\""+ p + "\":" + objectToJson(A[p]);
              else if (typeof A[p] == "string")
                  W += (W == "" ? "" : ",") +"\""+ p + "\":\"" + A[p].replace("\"", "\\\"") + "\"";
              else if (typeof A[p] == "number" || typeof A[p] == "boolean")
                  W += (W == "" ? "" : ",") + "\""+ p + "\":" + A[p] + "";
          }
          W = "{" + W + "}";
      }
  }
  return W;
}
//将JSON数据转化为对象
function JsonToObject(str)
{
	var obj=null;
	try
	{
		eval(" obj = "+str);
	}catch(e)
	{
		obj = null;
	}finally 
	{
		if(typeof obj!="object")
			obj = null;
		return obj;
	}
}
/**
 *从字符串中获取指定参数值
 * @param {} url 可选，默认为但前网页地址
 * @param {} paraKey
 * @return {String}
 */
function getPara() {
	var A = arguments;
	if(A.length <= 0)
		return "";
	var url = "";
	var paraKey = "";
	if(A.length > 1) {
		url = A[0];
		paraKey = A[1];
	} else {
		url = window.location.href;
		paraKey = A[0];
	}
	var ret = "";
	if(( typeof (url) == "string") && ( typeof (paraKey) == "string")) {
		var iPos = url.indexOf("?");
		if(iPos < 0 || iPos == url.length - 1)
			return "";
		url = url.substring(iPos + 1);
		var paras = url.split("&");
		for(var i = 0; i < paras.length; i++) {
			if(paras[i].indexOf(paraKey + "=") == 0) {
				ret = paras[i].substring(paraKey.length + 1);
				break;
			}
		}
	}
	return decodeURI(ret);
}

//除去数组中元素函数
function removeElement(index, array) {
	array.splice(index, 1);
	return array;
}

//得到字符串的真实长度（双字节换算为两个单字节）
function getStrActualLen(sChars) {

	var realLength = 0, len = sChars.length, charCode = -1;
	for(var i = 0; i < len; i++) {
		charCode = sChars.charCodeAt(i);
		if(charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
}

// 截取固定长度子字符串
function getInterceptedStr(sSource, iLen) {
	if(getStrActualLen(sSource) <= iLen) {
		return sSource;
	}
	var ELIDED = "...";
	var str = "";
	var l = 0;
	var schar;
	for(var i = 0; schar = sSource.charAt(i); i++) {
		if( typeof (schar) == "undefined")
			break;
		str += schar;
		l += (schar.charCodeAt(0) > 0xff ? 2 : 1);
		if(l >= iLen - ELIDED.length) {
			break;
		}
	}
	str += ELIDED;
	return str;
}

//设置样式属性值
function setStyleValue(obj, attr, val) {
	var tmp = obj.style;
	if(attr == "left" || attr == "top" || attr == "width" || attr == "height") {
		if((attr == "width" || attr == "height") && (obj.tagName == "IMG" || obj.tagName == "IMAGE"))
			obj[attr] = val;
		else
			tmp[attr] = val + "px";
	} else {
		tmp[attr] = val;
	}
}

//设置样式属性值
function getStyleValue(obj, attr) {
	var tmp = obj.style;
	if(attr == "left" || attr == "top" || attr == "width" || attr == "height") {
		if(false && (attr == "width" || attr == "height") && (obj.tagName == "IMG" || obj.tagName == "IMAGE"))
			return parseInt(obj[attr], 10);
		else
			return parseInt(tmp[attr], 10);
	} else {
		return tmp[attr];
	}
}

//获取dom对象
function $(id) {
	return window.document.getElementById(id);
}

/**
 * 用来方便前期开发的盒子调试
 * @author xinxin.zhou@coopen.cn
 */
function xdebug(info) {
	var myDate = new Date();
	var str;
	var yr = myDate.getYear();
	var mh = myDate.getMonth();
	var da = myDate.getDate();
	var mytime = myDate.toLocaleTimeString();
	myDate.toLocaleString();
	str = "调试时间： " + mytime + "\n";
	if( typeof info != 'undefined' && info != '') {
		str = str + "调试信息：\n";
		if(info.constructor == Array) {
			for(var i = 0; i < info.length; i++) {
				str = str + info[i] + "\n";
			}
		} else if( typeof info == 'object') {
			for(prop in info) {
				str = str + "\n属性：" + prop + " 值：" + info[prop];
			}
		} else {
			str = str + info;
		}
	};
}