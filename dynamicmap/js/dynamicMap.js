var door_position = iPanel.ioctlRead("door_position")||"0";

(function() {
	//圆点图标
	var dotImg = {
		"pass" : "./images/state/white.png",	// 通过站
		"current" : "./images/state/red.png",	// 当前站
		"nopass" : "./images/state/green.png"	// 未通过站
	};
	var currentStation = -1; //当前站点
	
	/**
	 * 动态地图管理
	 */
	var dynMap = function() {
		/**
		 * 初始化线路信息
		 * @return
		 */
		this.initLine = function() {
			var con = [];
			var lineObj = $("lineUI");
			setStyleValue(lineObj, "width", Lines.width);
			setStyleValue(lineObj, "height", Lines.height);
			setStyleValue(lineObj, "background", "url('" + Lines.bgImg + "')");
            //显示所有站点
            for (var i = 0; i < Lines.stations.length; i++) {
                var station = Lines.stations[i];
                con.push("<div id='cStationBg2_"+i+"' style='position:absolute;left:" + (door_position=="0"?station.position[0]:station.position[4]) + "px;top:" + (door_position=="0"?station.position[1]:station.position[5]) + "px; width:"+station.position[2]+"px;height:"+station.position[3]+"px;overflow:hidden'>");
                con.push("<img id='stationImg_"+(i+1)+"' src='" + station.img + "' style='position:absolute;left:0px;top:0px;'/>");
                con.push("</div>");
                var tmpImg = dotImg.nopass;
                con.push("<img id='dot_"+(i+1)+"' src='" + tmpImg + "' style='position:absolute;left:" + (door_position=="0"?station.dot[0]:station.dot[2]) + "px;top:" + (door_position=="0"?station.dot[1]:station.dot[3]) + "px;'/>");

            };

            //显示所有换乘站
            for(var i=0; i< Lines.changeStation.length;i++){
                var changeStation = Lines.changeStation[i];
                con.push("<div style='position:absolute;left:" + (door_position=="0"?changeStation.position[0]:changeStation.position[4]) + "px;top:" + (door_position=="0"?changeStation.position[1]:changeStation.position[5]) + "px;'>");
                con.push("<img id='changeStation_donghua_"+changeStation.id+"'  src='./images/changestation/"+changeStation.tranline+"/0000.png' style='position:relative;left:0px;top:0px'/>");
                con.push("<img id='changeStation_img_"+changeStation.id+"' src='./images/changestation/"+changeStation.tranline+".png' style='position:absolute;left:"+(i==2?"-10":"-11")+"px;top:-9px'/>");
                con.push("</div>");
            };

            //方向箭头
            for(var i=0;i<Lines.direction.length;i++){
                var po = Lines.direction[i].position;
                con.push("<div style='background:url(\"./images/jiantou/"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;left:"+(door_position=="0"?po[0]:po[2])+"px;top:"+(door_position=="0"?po[1]:po[3])+"px;-webkit-transform:rotate("+(door_position=="0"?po[4]:po[5])+"deg);'/>");
                con.push("<img id='direction_"+(i+1)+"' src='./images/none.gif'>");
                con.push("</div>")
            };

            //列车开往
            con.push("<img id='logo' style='position:absolute;left:420px;top:10px;width:470px;height:46px;' src='./images/logo.png'/>");
            con.push("<img id='kaiwangImg' style=position:absolute;left:1000px;top:15px;width:384px;height:36px;' src='./images/directdonghua/1.png'/>");
            con.push("<div id='kaiwang' style='position:absolute;left:660px;top:10px;width:384px;height:36px;'></div>");
            //开门关门`
            con.push("<img id='door_txt1' src='./images/none.gif' style='position:absolute;left:1320px;top:73px;height:60px;width:220px;'/>");
            con.push("<div style='width:157px;height:60px;position:absolute;left:1150px;top:77px;overflow:hidden;'><img id='cDoor1'  src='./images/none.gif'  style='position:absolute;'></div>");
            lineObj.innerHTML = con.join("");


            /**************放大场景**********************/
            var zLineObj = $("zLineUI");
            var con= [];
            con.push("<img id='logo2' src='./images/logo.png' style='position:absolute;left:380px;top:20px;'/>");
            con.push("<img id='going1_txt' src='./images/going.png' style='position:absolute;left:1050px;top:25px;'/>");
            con.push("<div id='doorbox' style='overflow: hidden;position: relative;width: 230px;height: 122px;top:120px ;'>")
            con.push("<img id='door' src='./images/none.gif' style='position: absolute;'/>");
            con.push("</div>")
            con.push("<div id='doorbox' style='width:266px;height:273px;border:3px solid #305749;position: absolute;top: 50px;border-radius: 10px;left: "+(door_position=='0'?'10':'1625')+"px;'>")
            con.push("<div class='zitiyanse'>A出口：XXXXXX</div>")
            con.push("<div class='zitiyanse'>B出口：XXXXXX</div>")
            con.push("<div class='zitiyanse'>C出口：XXXXXX</div>")
            con.push("<div class='zitiyanse'>C出口：XXXXXX</div>")
            con.push("</div>")


            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:480px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?1:4)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:550px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?11:14)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:757px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?2:3)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:827px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?12:13)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:1034px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?3:2)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:1104px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?13:12)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:1311px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?4:1)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")
            con.push("<div style='background:url(\"./images/station/zline_pass"+(door_position=='0'?'1':'2')+".png\");width:25px;height:19px;position:absolute;top:175px;left:1381px;'/>");
            con.push("<img id='cJiantou1_"+(door_position=='0'?14:11)+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
            con.push("</div>")


            for(var i= 0, n=5; i< n; i++){
                if(i!= n){
                    con.push("<div style='width:72px;height:70px;position:absolute;top:160px;left:"+(374+ i*274)+"px;'/>");
                    con.push("<img id='cTranline1_"+i+"' src='./images/none.gif' style='position:absolute;top:0px;left:0px;'/>");
                    con.push("<img id='cDot1_"+i+"' src='./images/state/white.png' style='position:absolute;top:-10px;left:-10px;'/>");

                    con.push("</div>");

                    con.push("<div id='cStationBg1_"+i+"' style='width:209px;height:71px;position:absolute;top:230px;left:"+(290+ i*280)+"px;'/>");
                    con.push("<img id='cStation1_"+i+"' src='./images/station/current/1.png' style='position:absolute;top:0px;left:0px;'/>");
                    con.push("</div>");
                }
            }
            zLineObj.innerHTML= con.join("");
		};

		/**
		 * 显示列车行式方向
		 * @param start 开始站
		 * @param end   结束站
		 * @param type  类型 1当前站  2下一站
		 * @param curstation 站点
		 * @return
		 */
		this.showDirection = function(start,end,curstation,door){
            $("door").src="./images/none.gif";
            $("zLineUI").style.display = "none";
			$("lineUI").style.display= "block";
            var jArray = [];
			var dir = 2;
            if(door_position == "0")
                dir = 1;
            else
                dir = 2;
			//下一站
			if(type==2){
				if(curstation!=0){
					$("dot_"+curstation).src = dotImg.next;
					if(dir==1){
                        alert($("direction_"+curstation));
						if($("direction_"+curstation))
							$("direction_"+curstation).src = "./images/jiantou/"+dir+"_n.png";
						if($("direction_"+(curstation-1)))
							$("direction_"+(curstation-1)).src = "./images/jiantou/"+dir+"_n.png";
					}else{
						if($("direction_"+curstation))
							$("direction_"+curstation).src = "./images/jiantou/"+dir+"_n.png";
						if($("direction_"+(curstation-1)))
							$("direction_"+(curstation-1)).src = "./images/jiantou/"+dir+".png";
					}

				}
			}else if(type==1){ //已点站
				if(curstation!=0){
					if(dir==1){
						if($("direction_"+curstation))
							$("direction_"+curstation).src = "./images/jiantou/"+dir+"_n.png";
						if($("direction_"+(curstation-1)))
							$("direction_"+(curstation-1)).src = "./images/jiantou/"+dir+".png";

					}else{
						if($("direction_"+curstation))
							$("direction_"+curstation).src = "./images/jiantou/"+dir+"_n.png";
						if($("direction_"+(curstation-1)))
							$("direction_"+(curstation-1)).src = "./images/jiantou/"+dir+".png";

					}
					$("dot_"+curstation).src = dotImg.current;

				}
			};


			//站牌动画
			if(currentStation>0){
				$("stationImg_"+currentStation).src = Lines.stations[currentStation-1].img;
				$("stationImg_"+currentStation).style.left = "0px";
				$("stationImg_"+currentStation).style.top = "0px";
				if(curstation>1&&curstation<28){
                    animationManager.amimationMove($("stationImg_"+curstation),"left","./images/station/donghua/"+curstation+".png",[1271,98],150,41);
                }

				else{
                    animationManager.amimationMove($("stationImg_"+curstation),"top","./images/station/donghua/"+curstation+".png",[114,1271],150,41);
                }

			};
			currentStation = curstation;

            for (var i = 0; i < Lines.stations.length; i++) {
                var tmp = Lines.stations[i];
                if(tmp.id == curstation ){
                    var imgArray = [];
                    if(tmp.tranline){
                        for(k=0;k<19;k++){
                            var kk = 100+k;
                            imgArray.push("./images/changestation/"+tmp.tranline+"/"+kk+".png");

                        };
                        animationManager.amimationImg("changeStation_donghua_"+tmp.id,imgArray,100,null);
                    }else{
                        for(var k=0;k<17;k++){
                            imgArray.push("./images/state/donghua/small/"+(1000+k)+".png");
                        };
                        animationManager.amimationImg("dot_"+tmp.id,imgArray,50,null);
                    }
                }else{
                }
            };

            for(var i=0; i< Lines.changeStation.length;i++){
                var changeStation = Lines.changeStation[i];
                if(changeStation.tranline == "37"){
                    var imgArray = [];
                    for(k=0;k<37;k++){
                        var kk = 100+k;
                        imgArray.push("./images/changestation/037/"+kk+".png");
                    };
                    animationManager.amimationImg("changeStation_img_"+changeStation.id,imgArray,100,null);
                }else{
                }
            };

			//站牌闪烁
			for(i=0;i<Lines.stations.length;i++){
				$("cStationBg2_"+i).style.background="transparent";
				if(i==curstation){
					$("cStationBg2_"+(i-1)).style.background="#26FF00";
				}
				if(curstation==Lines.stations.length){
					$("cStationBg2_"+(curstation-1)).style.background="#26FF00";
				}
			}

			for(var i=i;i<Lines.stations.length+1;i++){
				if($("direction_"+i))
					$("direction_"+i).src = "./images/none.gif";

			};

			//列车开往动画
            for(var i=1;i<Lines.stations.length+1;i++){
                if(i<curstation&&i>=start){
                    $("dot_"+i).src = dotImg.pass;
                    if($("direction_"+i)&&i!=end)
                        $("direction_"+i).src = "./images/jiantou/"+dir+".png";
                }
                if(i>curstation&&i<end){
                    $("dot_"+i).src = dotImg.nopass;
                    if($("direction_"+i)&&i!=end)
                        $("direction_"+i).src = "./images/jiantou/"+dir+"_n.png";
                    jArray.push("direction_"+i);
                }
            };
            animationManager.amimationJiantou("jiantou1",jArray,300);

			if(door==1){ //本侧开门
				$("door_txt1").src= "./images/door/open_txt.png";
			}else if(door==2){ //对侧开门
				$("door_txt1").src= "./images/door/noopen_txt.png";
			}else{
				$("cDoor1").src= "./images/none.gif";
				$("door_txt1").src= "./images/none.gif";
			}

			var nextImg = "./images/station/next/";
			animationManager.stopAmimation("cachudonghua"); //关闭动画
			if(curstation==3 ||curstation==5 ||curstation==10 ||curstation==12 ||curstation==13 ||curstation==18 ||curstation==27){
				animationManager.amimationCaochu("cachudonghua",[nextImg+"zh/"+curstation+'.png',nextImg+"cn/"+curstation+'.png',nextImg+"en/"+curstation+'.png',nextImg+"cn/"+curstation+'_1.png'],30,10,[370,83,930,50],true);
			}else{
				animationManager.amimationCaochu("cachudonghua",[nextImg+"zh/"+curstation+'.png',nextImg+"en/"+curstation+'.png'],30,10,[370,83,930,50],true);
			}

			//animationManager.stopAmimation("dot_"+currentStation);
			animationManager.stopAmimation("stationImg_"+currentStation);
		};


		/**
		 * 显示列车行式方向放大界面
		 * @param start 开始站
		 * @param end   结束站
		 * @param curstation 站点
		 * @return
		 */
		this.showZDirection = function(start,end,curstation,door){
			$("zLineUI").style.display= "block";
            $("lineUI").style.display = "none";
			var jArray= [];
            var t= 2;  //界面总共显示5个站， 左右两边各显示2个
            var s= 0, e= 0;
            if(curstation - t<= 0){
                s= 1;
                e= s + 2*t;
            }else if(curstation + t>= end){
                s= end - 2*t;
                e= end;
            }else{
                s= curstation - t;
                e= curstation + t;
            }
			//console.log("s=="+s+"e=="+e)
			for(var i= s, n= e; i<= n; i++){//s= 1 e=5
				var id= (4-(e-i));//id= 0 1 2 3 4
				//console.log(id);
                //console.log(i);//i= 1 2 3 4 5
				$("cStationBg1_"+(door_position=="0"?id:(n-i))).style.background="transparent";
				$("cStation1_"+(door_position=="0"?id:(n-i))).src= "./images/station/current/"+i+".png";//设置放大图中的站点
				var tranline= Lines.stations[i-1].hasOwnProperty("tranline") ? Lines.stations[i-1].tranline : null;//判断这五站中是否存在换乘站
				//console.log("tranline="+tranline+"            i="+i);
				$("cTranline1_"+(door_position=="0"?id:(n-i))).src=(tranline== null ? "./images/none.gif" : "./images/changestation/"+tranline+"/0000.png");//添加换乘站图片

				if(i< curstation){
                    if(tranline == "37"){
                        var imgArray = [];
                        for(var k=0;k<37;k++){
                            imgArray.push("./images/changestation/037/"+(100+k)+".png");
                        };
                        animationManager.amimationImg("cDot1_"+(door_position=="0"?id:(n-i)),imgArray,50,null);
                    }else{
                        $("cDot1_"+(door_position=="0"?id:(n-i))).src=(tranline== null ? "./images/state/white.png" : "./images/changestation/"+tranline+".png");
                    }

				}else if(i> curstation){
                    if(tranline == "37"){
                        var imgArray = [];
                        for(var k=0;k<37;k++){
                            imgArray.push("./images/changestation/037/"+(100+k)+".png");
                        };
                        animationManager.amimationImg("cDot1_"+(door_position=="0"?id:(n-i)),imgArray,50,null);
                    }else{
                        $("cDot1_"+(door_position=="0"?id:(n-i))).src=	(tranline== null ? "./images/state/green.png" : "./images/changestation/"+tranline+".png");
                    }
				}else{
                    if(tranline == "37"){
                        var imgArray = [];
                        for(var k=0;k<37;k++){
                            imgArray.push("./images/changestation/037/"+(100+k)+".png");
                        };
                        animationManager.amimationImg("cDot1_"+(door_position=="0"?id:(n-i)),imgArray,50,null);
                    }else{
                        $("cDot1_"+(door_position=="0"?id:(n-i))).src=	(tranline== null ? "./images/none.gif" : "./images/changestation/"+tranline+".png");
                    }
					$("cStationBg1_"+(door_position=="0"?id:(n-i))).style.background="#26FF00";
					if(tranline!= null){
						var imgArray = [];
						for(k=0;k<19;k++){
							imgArray.push("./images/changestation/"+tranline+"/"+(100+k)+".png");
						};
						animationManager.amimationImg("cTranline1_"+(door_position=="0"?id:(n-i)),imgArray,100,null);
					} else{
                        $("cDot1_"+(door_position=="0"?id:(n-i))).src=	(tranline== null ? "./images/none.gif" : "./images/changestation/"+tranline+".png");
                        var imgArray = [];
                        for(var k=0;k<17;k++){
                            imgArray.push("./images/state/donghua/big/"+(1000+k)+".png");
                        };
                        animationManager.amimationImg("cDot1_"+(door_position=="0"?id:(n-i)),imgArray,50,null);



					}
				}

			}
            for(var i= s, n= e-1; i<= n; i++){//s= 1 e=5
                var id= (5-(e-i));//id=
                if(door_position == "0"){
                    if(i< curstation){
                        $("cJiantou1_"+id).src= "./images/none.gif";
                    }else if(i> curstation){
                        $("cJiantou1_"+id).src= "./images/station/zline_nopass1.png";
                        $("cJiantou1_1"+id).src= "./images/station/zline_nopass1.png";
                        jArray.push("cJiantou1_"+id,"cJiantou1_1"+id);
                    }else{
                        $("cJiantou1_"+id).src= "./images/station/zline_nopass1.png";
                        $("cJiantou1_1"+id).src= "./images/station/zline_nopass1.png";
                        jArray.push("cJiantou1_"+id,"cJiantou1_1"+id);
                    }
                }else{
                    if(i< curstation){
                        $("cJiantou1_"+id).src= "./images/none.gif";
                    }else if(i> curstation){
                        $("cJiantou1_"+id).src= "./images/station/zline_nopass2.png";
                        $("cJiantou1_1"+id).src= "./images/station/zline_nopass2.png";
                        jArray.push("cJiantou1_1"+id,"cJiantou1_"+id);
                    }else{
                        $("cJiantou1_"+id).src= "./images/station/zline_nopass2.png";
                        $("cJiantou1_1"+id).src= "./images/station/zline_nopass2.png";
                        jArray.push("cJiantou1_1"+id,"cJiantou1_"+id);
                    }
                }

            }
			animationManager.amimationJiantou("jiantou",jArray,500);


			if(curstation==3 ||curstation==5 ||curstation==10 ||curstation==12 ||curstation==13 ||curstation==18 ||curstation==27){
				animationManager.amimationCaochu("cachudonghua",["./images/station/next1/zh/"+curstation+'.png',"./images/station/next/cn/"+curstation+'.png',"./images/station/next1/en/"+curstation+'.png',"./images/station/next/cn/"+curstation+'_1.png'],50,10,[450,85,500,200],true);
			}else{
				animationManager.amimationCaochu("cachudonghua",["./images/station/next1/zh/"+curstation+'.png',"./images/station/next1/en/"+curstation+'.png'],50,10,[450,85,500,200],true);
			}
		}
        //局部开关门
        this.doorStatus = function(door){
            if(door==1){
                $("doorbox").style.left= (door_position=='0'?'1650':'60')+"px";
                animationManager.amimationMove($("door"),"up","./images/door/big/open.png",[230,1220],80,122, 0);
            }else if (door==2){
                $("doorbox").style.left= (door_position=='0'?'1712':'92')+"px";

                animationManager.amimationMove($("door"),"up","./images/door/big/noopen.png",[106,2562],80,122, 0);
            }
        }
		/**
		 * @param start 开始站
		 * @param end   结束站
		 * @param type  类型 1当前站  2下一站
		 * @param curstation 站点
		 * @return
		 */
		this.refreshStation = function(start,end,type,curstation,door){
			door = parseInt(door,10);
			start = parseInt(start,10);
			end = parseInt(end,10);
			type = parseInt(type,10);
			curstation = parseInt(curstation,10);
			animationManager.stopAllAmimation();

			if(type!=0){
                currentStation = curstation;
            }
				//currentStation = curstation;

			//$("lineUI").style.display = "none";
			//$("zLineUI").style.display = "none";
			//下一站
			if(type==1){
				this.showDirection(start, end, curstation,door);
			}else if(type==2){ //局部放大
				this.showZDirection(start, end, curstation,door);
                var self= this;
                dynMapTimeout= setTimeout(function(){
                    self.doorStatus(door);
                    setTimeout(function(){
                        self.showDirection(start, end, curstation,door);
                        animationManager.stopAmimation("cachudonghua"); //关闭动画
                        if(curstation==3 ||curstation==5 ||curstation==10 ||curstation==12 ||curstation==13 ||curstation==18 ||curstation==27){
                            animationManager.amimationCaochu("cachudonghua",["./images/station/next1/zh/"+curstation+'.png',"./images/station/next/cn/"+curstation+'.png',"./images/station/next1/en/"+curstation+'.png',"./images/station/next/cn/"+curstation+'_1.png'],30,10,[370,83,930,50],true);
                        }else{
                            animationManager.amimationCaochu("cachudonghua",["./images/station/next1/zh/"+curstation+'.png',"./images/station/next1/en/"+curstation+'.png'],30,10,[370,83,930,50],true);
                        }
                    },6000);
                },3000)
			}

		};
	};
	// 动态地图解析器
	window.dynMap = window._dynMap = dynMap;
})();