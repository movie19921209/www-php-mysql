var door_position = iPanel.ioctlRead("door_position")||"0";  //0左  1 右; 

(function() {
	var currentStation = -1; //当前站点
	/**
	 * 动态地图管理
	 */
	var dynMap = function() {
		/**
		 * 初始化线路信息(*******************全局路线******************)
		 * @return
		 */
		this.initLine = function() {
			var con = [];
			var lineObj = $("lineUI");
			con.push("<img src='./images/logo.png' style='left:0px;top:0px;position:absolute;'/>");
			con.push("<img src='./images/title.png' style='right:0px;top:0px;position:absolute;'/>");
			con.push("<img src='./images/station/line.png' style='left:188px;top:156px;position:absolute;'/>");
			for (var i = 0, n= 8; i <= n; i++) {
				con.push("<img src='./images/station/line1.png' style='position:absolute;left:"+(65+221*i)+"px;bottom:0px;'/>");
				if(i== 0){
					continue;
				}
				con.push("<div id='stationBg_"+i+"' align='center' style='left:"+(66+221*(i-1))+"px;top:78px;	width: 221px;height: 279px;position: absolute; '>");
				con.push("<img id='station_bg_"+i+"'  style='position:absolute;bottom:0px;left:0px;display:none;' src='./images/station/bg.png' />");
				con.push("<img id='station_"+i+"' style='position:relative;top:197px' src='./images/station/nopass/"+i+".png'>");
				con.push("<img id='station_dir_"+i+"'  style='position:relative;top:25px' src='./images/station/nopass/dot.png' />");

				con.push("</div>");
				if(i!= n){
					con.push("<img id='jiantou_"+i+"' style='left:"+(283+221*(i-1))+"px;top:275px;position: absolute;' src='./images/station/jiantou.png'>");
				}
			};
			lineObj.innerHTML = con.join("");



			/*-------------放大线路-------------*/
			con = [];
			var zLineObj = $("zLineUI");
			con.push("<img src='./images/logo.png' style='left:0px;top:0px;position:absolute;'/>");
			con.push("<img src='./images/title.png' style='right:0px;top:0px;position:absolute;'/>");
			for (var i = 1, n= 3; i <= n; i++) {

				con.push("<div id='zStationBg_"+i+"' align='center' style='left:"+(50+443*(i-1))+"px;top:78px;	width: 443px;height: 279px;position: absolute;'>");
				if(i== 2){
					con.push("<img style='top:73px;position: absolute;left:-21px;' src='./images/station/zcurrent/bg.png'>");
					con.push("<img id='zStation_"+i+"' style='top:155px;position: relative;' src='./images/station/zcurrent/"+i+".png'>");
				}else{
					con.push("<img id='zStation_"+i+"' style='top:130px;position: relative;' src='./images/station/znopass/"+i+".png'>");
				}
				con.push("</div>");
			};
			zLineObj.innerHTML = con.join("");




			/*-----------到站-----------*/
			con = [];
			var cLineObj = $("currentUI");
			con.push("<img src='./images/logo.png' style='left:0px;top:0px;position:absolute;'/>");
			con.push("<img src='./images/title.png' style='right:0px;top:0px;position:absolute;'/>");

			con.push("<div align='center' style='left:650px;top:135px;width: 629px;height: 170px;position: absolute;background:url(\"./images/station/arrive/bg.png\")'>");
			con.push("<img id='cStation' src='./images/none.gif' style='position:relative;top:100px;'/>");
			con.push("</div>");
			con.push("<img id='door_bg' src='./images/door/open_bg.png' style='position:absolute;left:30px;top:100px;'/>");
			con.push("<div align='center' style='position:absolute;left:120px;top:135px;overflow:hidden;height:137px;width:294px;'/>");
			con.push("<img id='bigDoor' src='./images/door/big/noopen.png' style='position:absolute;right:0px;top:0px;'/>");

			con.push("</div>");

			cLineObj.innerHTML = con.join("");
		};
		
		/**
		 * 初始化当前站UI
		 * @return
		 */
		this.initCurrentUI = function(door){
			if(door==1){ //本侧开门

				$("door_bg").src= "./images/door/open_bg.png";
				
				animationManager.amimationMove($("bigDoor"),"up","./images/door/big/open.png",[294,2055],80,137);

			}else if(door==2){ //对侧开门

				$("door_bg").src= "./images/door/noopen_bg.png";
				animationManager.amimationMove($("bigDoor"),"up","./images/door/big/noopen.png",[294,274],500,137);
			}else{

				$("bigDoor").src= "./images/none.gif";
				$("door_bg").src= "./images/none.gif";
			}
			$("cStation").src= "./images/station/arrive/"+currentStation+".png";

			$("currentUI").style.display= "block";
		};

		/**
		 * 显示列车行式方向
		 * @param start 开始站
		 * @param end   结束站
		 * @param curstation 当前站点
		 * @return
		 */
		this.showZDirection = function(start,end,curstation){

			var dir = 2;
			if(start<end)//起始站小于结束站
				dir = 1;
			var s= curstation;//当前站

			if(s-1 > 0){
				$("zStation_1").src= "./images/station/zpass/"+(s-1)+".png";
			}else{
				$("zStation_1").src= "./images/none.gif";
			}
			$("zStation_2").src= "./images/station/zcurrent/"+s+".png";
			if(s+1 <= end){
				$("zStation_3").src= "./images/station/znopass/"+(s+1)+".png";
			}else{
				$("zStation_3").src= "./images/none.gif";
			}

			$("zLineUI").style.display= "block";


		};
		/**
		 * 显示列车行驶方向
		 * @param start 开始站
		 * @param end   结束站
		 * @param curstation 站点
		 * @return
		 */
		this.showDirection = function(start,end,curstation){
			//console.log("=="+end)
			var dir = 2;
			if(start<end)
				dir = 1;
			if(dir == 1){ //起始站小于结束站

				for(var i= start; i<= end;i++){
					if(i!= end){
						$("jiantou_"+i).style.display= "block";
					}

					if(i < curstation){
						$("station_"+i).src = "./images/station/pass/"+i+".png";
						$("station_dir_"+i).src = "./images/station/pass/dot.png";
						$("station_bg_"+i).style.display = "none";

					}else if(i== curstation){

						$("station_"+i).src = "./images/station/current/"+i+".png";
						$("station_dir_"+i).src = "./images/station/current/dot.png";
						$("station_bg_"+i).style.display = "block";
						if(i-1!= 0){
							$("jiantou_"+(i-1)).style.display= "none";
						}
						if(i!= end){
							$("jiantou_"+i).style.display= "none";
						}


					}else{
						$("station_"+i).src = "./images/station/nopass/"+i+".png";
						$("station_dir_"+i).src = "./images/station/nopass/dot.png";
						$("station_bg_"+i).style.display = "none";
					}

				}

			}

			$("lineUI").style.display= "block";
		};
		
		/**
		 * @param start 开始站
		 * @param end   结束站
		 * @param type  类型 1当前站  2下一站
		 * @param curstation 站点
		 * @param door  开门侧
		 * @return
		 */
		this.refreshStation = function(start,end,type,curstation,door){

			door = parseInt(door,10);
			start = parseInt(start,10);
			end = parseInt(end,10);
			type = parseInt(type,10);
			curstation = parseInt(curstation,10);

			animationManager.stopAllAmimation();

			if(type!=0)
				currentStation = curstation;

			$("currentUI").style.display = "none";
			$("lineUI").style.display = "none";
			$("zLineUI").style.display = "none";
			//下一站
			if(type==1){
				this.showDirection(start, end, curstation);
				
			}else if(type==2){ //已到站
				this.initCurrentUI(door);
			}else if(type==3){ //局部放大
				this.showZDirection(start, end, curstation);
			}else{
				this.initCurrentUI(door);
			}
		};
	};
	// 动态地图解析器
	window.dynMap = window._dynMap = dynMap;
})();