/**
 * 动画管理
 */
var animationManager = (function() {
	var amimationImgHandel = -1;
	var amimationCaochuHandel = -1;
	var amimationCaochuIdx = 0;
	var amimationCaochuTimeout = -1;
	var amimationMoveHandel = -1;
	var amimationWater = -1;
	
	/**
	 * 动作句柄清单
	 */
	var handelList = [];
	
	return {
		/**
		 * 根据ID获取动作句柄
		 */
		getHandelById:function(id){
			var handel = -1;
			for(var i=0;i<handelList.length;i++){
				if(handelList[i].session == id){
					handel = handelList[i];
				}			
			}
			return handel;
		},
		
		/**
		 * 根据id停止掉某个动作
		 */
		stopAmimation : function(id){
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
				this.delHandelById(id);
			};
			if(id=="caochu"||id=="welcome")
			{
				window.clearTimeout(amimationCaochuTimeout);
			}
		},
		
		//停止所有动作
		stopAllAmimation : function(){
			for(var i=0;i<handelList.length;i++){
				var handelObj = handelList[i];
				window.clearInterval(handelObj.handel);
			};
			window.clearTimeout(amimationCaochuTimeout);
		},
		
		delHandelById:function(id){
			var idx = -1;
			for(var i=0;i<handelList.length;i++){
				if(handelList[i].session == id){
					idx = i;
				};	
			};
			if(idx!=-1){
				handelList = handelList.del(idx);
			}
		},
		
		/*
		 * 箭头动画
		 */
		amimationJiantou : function(id,jiantouArray,speed){
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			};
			for(var k=0;k<jiantouArray.length;k++){
				$(jiantouArray[k]).style.display="none"; 
			};
			var i = 0;
			handelObj.handel = window.setInterval(function() {
				if (i >= jiantouArray.length){
					for(var k=0;k<jiantouArray.length;k++){
						$(jiantouArray[k]).style.display="none"; 
					};
					i = -1;
				};
				if($(jiantouArray[i]))
					$(jiantouArray[i]).style.display="block"; 
				i++;
			}, speed);
		},
		
		/**
		 * 换图动画
		 * @param id
		 * @param imgArray
		 * @param speed
		 * @param positsion
		 * @return
		 */
		amimationImg : function(id, imgArray, speed, positsion) {
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			};
			var i = 0;
			var imgObj = $(id);
			if (!imgObj) {
				imgObj = document.createElement("img");
				imgObj.id = id;
				imgObj.style.position = "absolute";
				imgObj.style.left = positsion[0] + "px";
				imgObj.style.top = positsion[1] + "px";
				imgObj.style.width = positsion[2] + "px";
				imgObj.style.height = positsion[3] + "px";
				imgObj.src = imgArray[0];
				document.body.appendChild(imgObj);
			};
			imgObj.src = imgArray[0];
			handelObj.handel = window.setInterval(function() {
				i++;
				if (i >= imgArray.length)
					i = 0;
				imgObj.src = imgArray[i];
			}, speed);
		},
		
		/**
		 * 擦出效果
		 * @param id
		 * @param img
		 * @param speed
		 * @param movelen
		 * @param positsion
		 * @return
		 */
		amimationCaochu : function(id, img, speed, movelen, positsion) {
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			}
			var i = 0;
			var divObj = $(id);
			var w = positsion[2];
			if (!divObj) {
				divObj = document.createElement("div");
				divObj.id = id;
				document.body.appendChild(divObj);
				divObj.style.position = "absolute";
				divObj.style.left = positsion[0] + "px";
				divObj.style.top = positsion[1] + "px";
				divObj.style.overflow = "hidden";
				divObj.style.width = "0px";
				divObj.style.height = positsion[3] + "px";
				divObj.style.width = "0px";
			};
			divObj.style.overflow = "hidden";
			divObj.style.width = "0px";
			divObj.style.height = positsion[3] + "px";
			divObj.style.width = "0px";
			divObj.innerHTML = "<img src='" + img + "' />";
			
			handelObj.handel = window.setInterval(function() {
				i += movelen;
				if (i >= w) {
					i = 0;
					window.clearInterval(handelObj.handel);
					window.clearTimeout(amimationCaochuTimeout);
					amimationCaochuTimeout = window.setTimeout(function() {
						animationManager.amimationCaochu(id, img, speed,movelen, positsion);
					}, 2000);
				}
				if(i>0)
					divObj.style.width = i + "px";
			}, speed);
		},
		
		
		/**
		 * 擦出效果
		 * @param id
		 * @param img
		 * @param speed
		 * @param movelen
		 * @param positsion
		 * @return
		 */
		amimationNext : function(id, img, speed, movelen, positsion) {
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			}
			var i = 0;
			var divObj = $(id);
			var w = positsion[2];
			if (!divObj) {
				divObj = document.createElement("div");
				divObj.id = id;
				document.body.appendChild(divObj);
				divObj.style.position = "absolute";
				divObj.style.left = positsion[0] + "px";
				divObj.style.top = positsion[1] + "px";
				divObj.style.overflow = "hidden";
				divObj.style.width = "0px";
				divObj.style.height = positsion[3] + "px";
				divObj.style.width = "0px";
				divObj.innerHTML = "<img src='" + img + "' />";
			};
			handelObj.handel = window.setInterval(function() {
				i += movelen;
				if (i >= w) {
					i = 0;
				}
				divObj.style.width = i + "px";
			}, speed);
		},
		
		
		/**
		 * 位移效果
		 * @param imgObj
		 * @param dir  left  up
		 * @param speed
		 * @param movelen
		 * @return
		 */
		amimationMove : function(imgObj,dir,imgUrl,size,speed,movelen) {
			var id = imgObj.id;
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			};
			//window.clearInterval(amimationMoveHandel);
			var i = 0;
			var w = parseInt(size[0],10);
			var h = parseInt(size[1],10);
			if(dir=="left"){
				imgObj.style.left="0px";
			}else {
				imgObj.style.top="0px";
			};
			imgObj.src = imgUrl;
			handelObj.handel = window.setInterval(function() {
				i -= movelen;
				if(dir=="left"){
					if (i <= -w) {
						i = 0;
					}
					imgObj.style.left = i + "px";
				}else{
					if (i <= -h) {
						i = 0;
					};
					imgObj.style.top = i + "px";
				}
			}, speed);
		},
		
		/**
		 * 列车开往水波纹动画
		 * @param imgObj
		 * @param dir  left  up
		 * @param speed
		 * @param movelen
		 * @return
		 */
		amimationWater : function(divObj,speed,movelen){
			var id = divObj.id;
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			};
			var w = parseInt(divObj.style.width,10);
			var h = parseInt(divObj.style.height,10);
			var con = "<img id='amimationwater_zhezhao' style='position:absolute;left:0px;width:73px;height:54px;' src='./images/station/2.png'/>";
			divObj.innerHTML = con;
			var i = 0;
			var imgObj = $("amimationwater_zhezhao");
			handelObj.handel = window.setInterval(function() {
				i += movelen;
				if(i>h){
					i=0;
				};
				imgObj.style.top = i+"px";
			}, speed);
		},
		
		/**
		 * 图片放大
		 */
		amimationZoom : function(imgObj,speed){
			var id = imgObj.id;
			var handelObj = this.getHandelById(id);
			if(handelObj!=-1){
				window.clearInterval(handelObj.handel);
			}else{
				handelObj = {"session":id,"handel":-1};
				handelList.push(handelObj);
			};
			var h = parseInt(imgObj.style.height,10);
			var isDir = 1;
			handelObj.handel = window.setInterval(function(){
				var w = parseInt(imgObj.style.width,10);
				var left = parseInt(imgObj.style.left,10);
				var top = parseInt(imgObj.style.top,10);
				if(w>=38)
					isDir = -1;
				if(w<33)
					isDir = 1;
				imgObj.style.width = (w + 2*isDir)+"px"; 
				imgObj.style.left = (left - 1*isDir)+"px"; 
				imgObj.style.top = (top - 4*isDir)+"px"; 
			}, speed);
		}
	};
})();