var status=null;
var reg=/((http|udp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)|(^[a-zA-Z]:[\\/]((?! )(?![^\\/]*\s+[\\/])[\w -]+[\\/])*(?! )(?![^.]+\s+\.)[\w -]+(.+)$)|(^([\/](| )[\w-]+)+(.+)$)/;
var objExp=new RegExp(reg);

$("#liveUrl").blur(function () {
    var liveUrl=$("#liveUrl").val();
    if(objExp.test(liveUrl)==false){
        alert("直播源格式错误，请重新输入")
    }else{

    }
})

/**
 * 读取记录和服务器状态
 */
$(function () {
    $.get("/record", {}, function (data) {
        for (var i = 0; i <data.data.length; i++) {
            var html;
            html+="<tr id='"+data.data[i].id+"'><td>"+data.data[i].name+"</td> <td>"+data.data[i].start+"——"+data.data[i].end+"</td> <td>"+data.data[i].liveUrl+"</td> <td> <button class='btn btn-success btn-xs' type='button' onclick='showModal(this.parentNode.parentNode.id)'>修改</button> <button class='btn btn-danger btn-xs' type='button' onclick='removeData(this.parentNode.parentNode.id)'>删除</button> </td> </tr>"
        }
        $("#table-body").html(html);
    }, "json")
    $.ajax({
        url:'/admin/state',
        type:'get',
        success: function (data) {
            console.log(data)
            if(data.data.state==true){
                $("#server").html("停止");
                $("#server").attr("class","btn btn-danger")
            }else{
                $("#server").html("启动");
                $("#server").attr("class","btn btn-success")
            }

        }
    })
})

/**
 * 增加和修改记录
 */
function submitInfo() {
    var name=$("#recordName").val();
    var start=$("#input_time1").val();
    var end=$("#input_time2").val();
    var type=null;
    var liveUrl=$("#liveUrl").val();
    if(start.length>10){
        type=parseInt(0);
    }else{
        type=parseInt(1);
    }
    var regTime=/(^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$)|(^(\d{1,2}):(\d{1,2})$)/;
    var timeExp=new RegExp(regTime);
    if(timeExp.test(start)==true&&timeExp.test(end)==true) {
        if (objExp.test(liveUrl) == false) {
            alert("直播源格式错误，请重新输入")
        } else {
            if (status == "add") {
                var id = getUuid();
                var doc = {
                    "name": name,
                    "id": id,
                    "type": type,
                    "start": start,
                    "end": end,
                    "liveUrl": liveUrl
                }
                $.ajax({
                    url: '/record',
                    type: 'POST',
                    data: doc,
                    dataType: "json",
                    success: function (data) {
                        $('#mymodal').modal('hide');
                        $("#recordName").val("");
                        $("#liveUrl").val("");
                        $("#radio1").removeAttr("checked");
                        $("#radio2").removeAttr("checked");
                        $("#time1").css("display", "none");
                        $("#time2").css("display", "none");
                        $("#input_time1").val("");
                        $("#input_time2").val("");
                        var html = "<tr id='" + data.data.id + "'><td>" + data.data.name + "</td> <td>" + data.data.start + "——" + data.data.end + "</td> <td>" + data.data.liveUrl + "</td> <td> <button class='btn btn-success btn-xs' type='button' onclick='showModal(this.parentNode.parentNode.id)'>修改</button> <button class='btn btn-danger btn-xs' type='button' onclick='removeData(this.parentNode.parentNode.id)'>删除</button> </td> </tr>"
                        $("#table-body").append(html);
                    }
                });
            } else {
                var id = $("#mymodal>p").val()
                var doc = {
                    "name": name,
                    "id": id,
                    "type": type,
                    "start": start,
                    "end": end,
                    "liveUrl": liveUrl
                }
                $.ajax({
                    url: '/record/' + id,
                    type: 'PUT',
                    data: doc,
                    success: function (data) {
                        console.log(data.data.id)
                        $('#mymodal').modal('hide');
                        $("#recordName").val("");
                        $("#liveUrl").val("");
                        $("#radio1").removeAttr("checked");
                        $("#radio2").removeAttr("checked");
                        $("#time1").css("display", "none");
                        $("#time2").css("display", "none");
                        $("#input_time1").val("");
                        $("#input_time2").val("");
                        $("#" + data.data.id + ">td:eq(0)").html(data.data.name);
                        $("#" + data.data.id + ">td:eq(1)").html(data.data.start + "——" + data.data.end);
                        $("#" + data.data.id + ">td:eq(2)").html(data.data.liveUrl);
                    }
                });
            }
        }
    }else{
        alert("时间格式错误，请重新输入！")
    }
}

/**
 * 删除记录
 */
function removeData(x){
    $.ajax({
        url: '/record/'+x,
        type: 'DELETE',
        success: function (data) {
            if(data.data.length==0){
                $("#table-body").html("");
            }else{
                console.log(data.data)
                console.log(typeof(data))
                for (var i = 0; i <data.data.length; i++) {
                    var htmlRemove;
                    htmlRemove+="<tr id='"+data.data[i].id+"'><td>"+data.data[i].name+"</td> <td>"+data.data[i].start+"——"+data.data[i].end+"</td> <td>"+data.data[i].liveUrl+"</td> <td> <button class='btn btn-success btn-xs' type='button' onclick='showModal(this.parentNode.parentNode.id)'>修改</button> <button class='btn btn-danger btn-xs' type='button' onclick='removeData(this.parentNode.parentNode.id)'>删除</button> </td> </tr>"
                }
                $("#table-body").html(htmlRemove);
            }
        }
    })
}

/**
 * 显示模态框
 */
function showModal(x){
    if(x=='add'){
        $("#mymodal").modal("show");
        status="add";
    }else{
        $("#mymodal").modal("show");
        status="update";
        $("#mymodal>p").val(x)
        var tableName=$("#"+x+">td:eq(0)").html();
        var time=$("#"+x+">td:eq(1)").html().split("——");
        var startTime=time[0];
        var endTime=time[1];
        var live=$("#"+x+">td:eq(2)").html();
        $("#recordName").val(tableName);
        $("#liveUrl").val(live);
        $("#time1").css("display","block");
        $("#time2").css("display","block");
        if(startTime.length>10){
            $("#radio1").trigger("click");
            $("#input_time1").val(startTime);
            $("#input_time2").val(endTime);
        }else{
            $("#radio2").trigger("click");
            $("#input_time1").val(startTime);
            $("#input_time2").val(endTime);
        }
    }
}

/**
 * 显示时间设置
 */
function show(x){
    $("#time1").css("display","block");
    $("#time2").css("display","block");
    if(x=="radio1"){
        $("#radio1").css("checked","checked");
        showTime(x)
    }else{
        $("#radio2").css("checked","checked");
        showTime(x)
    }
}

/**
 * 显示时间
 */
function showTime(x){
    var start = "";
    var end = "";
    var startTime = new Date();
    var time = startTime.getTime() + 1000*60*5;
    var endTime = new Date(time)
    if(x=="radio1"){
        start = startTime.getFullYear()+"-";
        start = start + (startTime.getMonth()+1)+"-";
        start = start + startTime.getDate()+" ";
        start = start + startTime.getHours()+":";
        start = start + startTime.getMinutes()+":";
        start = start + startTime.getSeconds()+"";

        end = endTime.getFullYear()+"-";
        end = end + (endTime.getMonth()+1)+"-";
        end = end + endTime.getDate()+" ";
        end = end + endTime.getHours()+":";
        end = end + endTime.getMinutes()+":";
        end = end + endTime.getSeconds()+"";
    }else{
        start = start + startTime.getHours()+":";
        start = start + startTime.getMinutes();

        end = end + endTime.getHours()+":";
        end = end + endTime.getMinutes();
    }
    $("#input_time1").val(start)
    $("#input_time2").val(end)
}

/**
 * 获得唯一ID
 */
function getUuid(){
    var len=32;//32长度
    var radix=16;//16进制
    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
    return uuid.join('');
}

/**
 * 隐藏模态框
 */
function hideModal(){
    $("#mymodal").modal("hide");
    $("#recordName").val("");
    $("#liveUrl").val("");
    $("#radio1").removeAttr("checked");
    $("#radio2").removeAttr("checked");
    $("#time1").css("display","none");
    $("#time2").css("display","none");
    $("#input_time1").val("");
    $("#input_time2").val("");
}

/**
 * 隐藏修改密码模态框
 */
function hidePwdModal(){
    $("#mymodal2").modal("hide");
    $("#oldpwd").val("");
    $("#newpwd").val("");
    $("#renewpwd").val("");
}


/**
 * 录制服务器状态
 */
function recordStatus(){
    var state=$("#server").html()
    if(state=="启动"){
        $.ajax({
            url: '/admin/start',
            type: 'get',
            success: function () {
                //alert("启动了")
                $("#server").html("停止");
                $("#server").attr("class","btn btn-danger")
            }
        })
    }else{
        $.ajax({
            url: '/admin/stop',
            type: 'get',
            success: function () {
                //alert("停止了")
                $("#server").html("启动");
                $("#server").attr("class","btn btn-success")
            }
        })
    }
}

/**
 * 退出登录
 */
function back(){
    window.location.href="/admin/login.html"
}

/**
 * 跳转录像任务
 */
function hrefRecordtask(){
    window.location.href="/admin/task.html"
}

/**
 * 修改密码
 */
function changePwd(){
    var oldpwd=$("#oldpwd").val();
    var newpwd=$("#newpwd").val();
    var renewpwd=$("#renewpwd").val();
    var doc={
        "oldpwd":oldpwd,
        "renewpwd":renewpwd
    }
    if(newpwd==renewpwd&&newpwd!=""){
        $.ajax({
            url: '/pwd',
            type: 'post',
            data: doc,
            success: function (data) {
                console.log(data.data)
                if(data.data==null){
                    alert("口令修改成功,请重新登录");
                    back();
                }else{
                    alert("原口令输入错误，请重新输入");
                }
            }
        })
    }else if(newpwd!=""){
        alert("两次输入不一致，请重新输入");
    }
}