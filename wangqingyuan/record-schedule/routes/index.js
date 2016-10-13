var express = require('express');
var router = express.Router();
var db = require("../db")
var log = require("log4js").getLogger("index")
var md5 = require("blueimp-md5").md5;
var path = require("path");
var fs = require("fs");
var pwd_file = path.join(process.cwd(), "pwd.bin");
var path = require("path");
var arr="";
//获得当前的密码
function getpassword(){
  var pwd = "sunniwell";
  
  if(fs.existsSync(pwd_file))
    pwd = fs.readFileSync(pwd_file).toString();
  else{
    //pwd = md5(pwd);
    fs.writeFileSync(pwd_file, new Buffer(pwd));
  }
  return pwd;	
}

/**
 * 构建错误响应
 */
function _err(code, desc) {
  return { err_code: code, err_desc: desc };
}

function _ok(data) {
  return { err_code: 0, data: data };
}

function processErr(err, res) {
  if (err) {
    res.json(_err(-1, err.toString()))
    res.end();
    return true;
  }
  return false;
}

/**
 * 登录验证
 */
router.post("/login", function(req, res){
    if(fs.existsSync('./db/data.db')){
    }else{
        fs.writeFileSync('./db/data.db',"")
    }
   var username = req.body.username
   var password = req.body.password
  log.debug(req.body,username == "admin",  getpassword() == password)
  if((username == "admin" && password == getpassword())){
    log.info("用户登陆成功")
    req.session.auth = "ok";	  
    res.redirect("/admin/index.html")  
  }else{
    log.error("用户密码或口令错误")
    res.redirect("/admin/login.html?err=err")  
  }

})

/**
 * 修改口令
 */
router.post("/pwd",function(req,res){
    var doc={
        "oldpwd":req.body.oldpwd,
        "renewpwd":req.body.renewpwd
    }
    var data="";
    var readerStream = fs.createReadStream('pwd.bin');
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function(chunk) {
        data=chunk;
        log.info(data);
        log.info(typeof(data))
        log.info(typeof(req.body.oldpwd))
        log.info(req.body.oldpwd);
    });
    readerStream.on('end',function(){
        log.info("ssssssssssssssssssssssssss");
        log.info(data);
        if(data==req.body.oldpwd){
            log.info("jinlaile")
            var writerStream = fs.createWriteStream("pwd.bin");
            writerStream.write(req.body.renewpwd,'UTF8');
            writerStream.end();
            writerStream.on('finish', function() {
                console.log("写入完成。");
            });
            writerStream.on('error', function(err){
                console.log(err.stack);
            });
            res.json(_ok(null));
            res.end()
        }else{
            var tip="原密码不正确"
            log.info(tip)
            res.json(_ok(tip));
            res.end()
        }
    });
    readerStream.on('error', function(err){
        console.log(err.stack);
    });

})

/**
 * 获取录制信息
 */
router.get('/record', function (req, res) {
    var data="";
    var readerStream = fs.createReadStream('./db/data.db');
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function(chunk) {
        data=chunk;
    });
    readerStream.on('end',function(){
        if(data==""){
            return
        }else{
            data=JSON.parse(data);
            res.json(_ok(data));
            res.end()
        }
    });
    readerStream.on('error', function(err){
        console.log(err.stack);
    });


});

/**
 * 新增录制信息
 */
router.post("/record", function(req, res){
    var doc={
        "name":req.body.name,
        "id":req.body.id,
        "type":req.body.type,
        "start":req.body.start,
        "end":req.body.end,
        "liveUrl":req.body.liveUrl
    }
    var readerStream = fs.createReadStream('./db/data.db');
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function(chunk) {
        arr=chunk;
    });
    readerStream.on('end',function(){
        if(arr==""){
            var b=[];
            b.push(doc)
        }else{
            b=JSON.parse(arr)
            b.push(doc)
        }
        var writerStream = fs.createWriteStream("./db/data.db");
        writerStream.write(JSON.stringify(b),'UTF8');
        writerStream.end();
        writerStream.on('finish', function() {
        });
        writerStream.on('error', function(err){
            console.log(err.stack);
        });
    });
    readerStream.on('error', function(err){
    });

    res.json(_ok(doc))
    res.end();
})

/**
 * 删除录制信息
 */
router.delete('/record/:id', function (req, res) {
    var data="";
    var readerStream = fs.createReadStream('./db/data.db');
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function(chunk) {
        log.info("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        log.info(chunk)
        data=chunk;
    });
    readerStream.on('end',function(){
        data=JSON.parse(data);
        log.info("bbbbbbbbbbbbbbbbbbb")
        //log.info(data[0].id)

        log.info(typeof(data))
        for(var a=0;a<data.length;a++){
            if(data[a].id==req.params.id){
                data.splice(a,1);
                log.info(data)
                log.info("jahahhahahahahahhahah");
            }
        }
        var writerStream = fs.createWriteStream("./db/data.db");
        writerStream.write(JSON.stringify(data),'UTF8');
        writerStream.end();
        writerStream.on('finish', function() {
            console.log("写入完成。");
        });
        writerStream.on('error', function(err){
            console.log(err.stack);
        });
        res.json(_ok(data));
        res.end()

    });
    readerStream.on('error', function(err){
        console.log(err.stack);
    });
});

/**
 * 修改录制信息
 */
router.put('/record/:id', function (req,res) {
    var doc={
        "name":req.body.name,
        "id":req.body.id,
        "type":req.body.type,
        "start":req.body.start,
        "end":req.body.end,
        "liveUrl":req.body.liveUrl
    }
    var data="";
    var readerStream = fs.createReadStream('./db/data.db');
    readerStream.setEncoding('UTF8');
    readerStream.on('data', function(chunk) {
        log.info("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        log.info(chunk)
        data=chunk;
    });
    readerStream.on('end',function(){
        data=JSON.parse(data);
        for(var a=0;a<data.length;a++){
            if(data[a].id==req.params.id){
                data.splice(a,1,doc);
            }
        }
        var writerStream = fs.createWriteStream("./db/data.db");
        writerStream.write(JSON.stringify(data),'UTF8');
        writerStream.end();
        writerStream.on('finish', function() {
            console.log("写入完成。");
        });
        writerStream.on('error', function(err){
            console.log(err.stack);
        });
        res.json(_ok(doc));
        res.end()

    });
    readerStream.on('error', function(err){
        console.log(err.stack);
    });
})


module.exports = router;
