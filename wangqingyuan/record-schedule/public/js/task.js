/**
 * Created by BlueEyes丶 on 2016-09-02.
 */

/**
 * 跳转录制信息
 */
function hrefRecordlist(){
    window.location.href="/admin/index.html"
}
/**
 * 获取task列表
 */
$(function () {
    $.get("/admin/task", {}, function (data) {
        console.log(data)
        for (var i = 0; i <data.data.length; i++) {
            var html;
            if (data.data[i].status == "10") {
                html += "<tr id='" + data.data[i]._id + "'><td>" + data.data[i].name + "</td> <td>" + data.data[i].start + "</td><td>" + data.data[i].end + "</td><td>" + data.data[i].length + "</td><td>" + data.data[i].url + "</td><td><button class='btn btn-danger btn-xs' type='button' onclick='removeTask(this.parentNode.parentNode.id)'>删除</button> <a href='/admin/video.html?recordName=" + data.data[i].name + "'>播放</a></td></tr>"
            }
            else{

            }
        }

        $("#table-body").html(html);
        if (!!document.createElement('video').canPlayType) {
            $("tr a").addClass("btn btn-success btn-xs");
            var vidTest = document.createElement("video");
            oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
            if (!oggTest) {
                h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                if (!h264Test) {
                    return false;
                }
                else {
                    if (h264Test == "probably") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                if (oggTest == "probably") {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            $("#tips").css("display","block");
            $("tr a").addClass("btn btn-default btn-xs");
            $("tr a").attr("href","#");
        }
    }, "json")
})

/**
 * 删除task
 */
function removeTask(x){
    $.ajax({
        url: '/admin/task/'+x,
        type: 'DELETE',
        success: function (data) {
            $("#"+x).remove();
        }
    })
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

/**
 * 播放录制任务
 */
function play(x){

}

/**
 * 退出登录
 */
function back(){
    window.location.href="/admin/login.html"
}


