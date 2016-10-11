
var Lines = {
	width : 1920,
	height : 357,
	bgImg : "./images/bg.png",
	stations : [ {
        "id" : "1",
		"position" : [ 5, 20, 161, 51,1745,20],
		"img" : "./images/station/1.png",
		"dot" : [ 148, 6,1675,6], // 圆点坐标
		"dotType" : "default", // 圆点类型, defult未开通   next下一站   pass已通过  current当前站  nopass未到达站
		"action" : {}, // 动作
		"animation" : {}
	}, {
        "id" : "2",
		"position" : [ 5, 100, 161, 51,1745,100],
		"img" : "./images/station/2.png",
		"dot" : [ 148,83,1675,83],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "3",
		"position" : [ 5, 180, 161, 51,1745,180],
		"img" : "./images/station/3.png",
		"dot" : [ 148, 161,1675,161],
        "tranline" : "7", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "4",
		"position" : [ 5, 260, 161, 51,1745,260],
		"img" : "./images/station/4.png",
		"dot" : [ 155, 240,1672,240],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "5",
		"position" : [ 240, 150, 47, 151,1610,150],
		"img" : "./images/station/5.png",
		"dot" : [ 233, 287,1604,287],
        "tranline" : "2", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "6",
		"position" : [ 320, 150, 47, 151,1535,150],
		"img" : "./images/station/6.png",
		"dot" : [ 309, 287,1526,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "7",
		"position" : [ 395, 150, 47, 151,1460,150],
		"img" : "./images/station/7.png",
		"dot" : [ 385, 287,1450,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "8",
		"position" : [ 475, 150, 47, 151,1385,150],
		"img" : "./images/station/8.png",
		"dot" : [ 461, 287,1374,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "9",
		"position" : [ 550, 150, 47, 151,1305,150],
		"img" : "./images/station/9.png",
		"dot" : [ 537, 287,1300,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "10",
		"position" : [ 630, 150, 47, 151,1235,150],
		"img" : "./images/station/10.png",
		"dot" : [ 615, 287,1221,287],
		"tranline" : "37", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "11",
		"position" : [ 700, 150, 47, 151,1155,150],
		"img" : "./images/station/11.png",
		"dot" : [ 689, 287,1145,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "12",
		"position" : [ 780, 150, 47, 151,1085,150],
		"img" : "./images/station/12.png",
		"dot" : [ 765, 287,1070,287],
		"tranline" : "1", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "13",
		"position" : [ 860, 150, 47, 151,1005,150],
		"img" : "./images/station/13.png",
		"dot" : [ 842, 287,993,287],
        "tranline" : "2", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "14",
		"position" : [ 930, 150, 47, 151,930,150],
		"img" : "./images/station/14.png",
		"dot" : [ 917, 287,917,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "15",
		"position" : [ 1005, 150, 47, 151,860,150],
		"img" : "./images/station/15.png",
		"dot" : [ 993, 287,842,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "16",
		"position" : [ 1085, 150, 47, 151,780,150],
		"img" : "./images/station/16.png",
		"dot" : [ 1070, 287,765,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "17",
		"position" : [ 1155, 150, 47, 151,700,150],
		"img" : "./images/station/17.png",
		"dot" : [ 1145, 287,689,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "18",
		"position" : [ 1235, 150, 47, 151,630,150],
		"img" : "./images/station/18.png",
		"dot" : [ 1221, 287,615,287],
		"tranline" : "4", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "19",
		"position" : [ 1305, 150, 47, 151,550,150],
		"img" : "./images/station/19.png",
		"dot" : [ 1300, 287,537,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "20",
		"position" : [ 1385, 150, 47, 151,475,150],
		"img" : "./images/station/20.png",
		"dot" : [ 1374, 287,461,287],
		"dotType" : "default",
		"animation" : {}
	},  {
        "id" : "21",
		"position" : [ 1460, 150, 47, 151,395,150],
		"img" : "./images/station/21.png",
		"dot" : [ 1450, 287,385,287],
		"dotType" : "default",
		"animation" : {}
	},  {
        "id" : "22",
		"position" : [ 1535, 150, 47, 151,320,150],
		"img" : "./images/station/22.png",
		"dot" : [ 1526, 287,309,287],
		"dotType" : "default",
		"animation" : {}
	},  {
        "id" : "23",
		"position" : [ 1610, 150, 47, 151,240,150],
		"img" : "./images/station/23.png",
		"dot" : [ 1604, 287,233,287],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "24",
		"position" : [ 1745, 260, 161, 51,5,265],
		"img" : "./images/station/24.png",
		"dot" : [ 1672, 240,155,240],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "25",
		"position" : [ 1745, 180, 161, 51,5,185],
		"img" : "./images/station/25.png",
		"dot" : [ 1675, 161,148,161],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "26",
		"position" : [ 1745, 100, 161, 51,5,105],
		"img" : "./images/station/26.png",
		"dot" : [ 1675, 83,148,83],
		"dotType" : "default",
		"animation" : {}
	}, {
        "id" : "27",
		"position" : [ 1745, 20, 161, 51,5,25],
		"img" : "./images/station/27.png",
		"dot" : [ 1675, 6,148,6],
		"tranline" : "3", // 换乘线路
		"dotType" : "default",
		"animation" : {}
	}],
	"changeStation" : [ {
		"id" : "3", // 站号
		"tranline" : "7", // 换乘线路
		"position" : [159.8,169.5, 49, 49 ,1685,169.5],
		"animation" : ""
	}, {
		"id" : "5", // 站号
		"tranline" : "2", // 换乘线路
		"position" : [ 247, 296, 49, 49 ,1615,296],
		"animation" : ""
	}, {
		"id" : "10", // 站号
		"tranline" : "37", // 换乘线路
		"position" : [ 625, 296, 49, 49 ,1231,296],
		"animation" : ""
	}, {
		"id" : "12", // 站号
		"tranline" : "1", // 换乘线路
		"position" : [ 776, 296, 49, 49 ,1080,296],
		"animation" : ""
	},{
		"id" : "13", // 站号
		"tranline" : "2", // 换乘线路
		"position" : [ 853, 296, 49, 49 ,1003,296],
		"animation" : ""
	} ,{
		"id" : "18", // 站号
		"tranline" : "4", // 换乘线路
		"position" : [ 1231, 296, 49, 49 ,626,296],
		"animation" : ""
	},{
		"id" : "27", // 站号
		"tranline" : "3", // 换乘线路
		"position" : [ 1685, 18, 49, 49 ,159.8,18],
		"animation" : ""
	}],
	"direction":[{"position":[172,70,1700,70,90,-90]},
	             {"position":[172,145,1700,145,90,-90]},
	             {"position":[172,230,1700,225,90,-90]},
	             {"position":[205,300,1670,295,30,-30]},
	             {"position":[300,311,1590,311,0,0]},
	             {"position":[375,311,1515,311,0,0]},
	             {"position":[450,311,1440,311,0,0]},
	             {"position":[525,311,1365,311,0,0]},
	             {"position":[600,311,1285,311,0,0]},
	             {"position":[680,311,1205,311,0,0]},
	             {"position":[750,311,1130,311,0,0]},
	             {"position":[828,311,1055,311,0,0]},
	             {"position":[908,311,980,311,0,0]},
	             {"position":[980,311,908,311,0,0]},
	             {"position":[1055,311,828,311,0,0]},
	             {"position":[1130,311,750,311,0,0]},
	             {"position":[1205,311,675,311,0,0]},
	             {"position":[1285,311,600,311,0,0]},
	             {"position":[1365,311,525,311,0,0]},
                 {"position":[1440,311,450,311,0,0]},
                 {"position":[1515,311,375,311,0,0]},
                 {"position":[1590,311,300,311,0,0]},
	             {"position":[1670,295,205,300,-30,30]},
	             {"position":[1700,225,172,225,-90,90]},
	             {"position":[1700,145,172,145,-90,90]},
	             {"position":[1700,70,172,70,-90,90]}]
};