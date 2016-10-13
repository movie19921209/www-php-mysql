var express = require('express');
var router = express.Router();
var db = require("../db")
var state = true;
var fs = require("fs");
var core = require("../core")
var config = require("../config")
var log = require("log4js").getLogger("index")
var path = require("path")
var policyfile = path.join(process.cwd(),'db', "data.db") //录制策略数据库
/**
 * 构建错误响应
 */
function _err(code, desc) {
    return { err_code: code, err_desc: desc };
}

function _ok(data) {
    return { err_code: 0, data: data };
}

router.get("/video",function(req,res){
    res.json(_ok(config.webport));
    res.end();
})

router.get("/task", function (req, res) {
    db.find("tasks", {}, function (err, docs) {
        res.json(_ok(docs));
        res.end();
    })
})

router.delete("/task/:id", function (req, res) {
    //删除实体文件
    log.info("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    log.info(req.params.id)
    db.find("tasks", { _id: req.params.id }, function (err, docs) {
        if(!docs || docs.length ==0 ){
            res.json(_err(-3, "没有这样的纪录!"))
            res.end();
            return;
        }
        fs.unlinkSync(path.join(config.store, docs[0].name))
        db.remove("tasks", { _id: req.params.id }, function (err, docs) {
            res.json(_ok(null));
            res.end();
        })

    })
})


//录制状态
router.get("/state", function (req, res) {
    res.json(_ok({ state: core.state }));
    res.end();
})

//
router.get("/start", function (req, res) {
    if (core.state) {
        res.json(_err(-3, "已经启动!"))
        res.end();
        return;
    }
    if (!fs.existsSync(policyfile)) {
        res.json(_err(-5, "无录制策略!"))
        res.end();
        return;
    }
    var data = JSON.parse(fs.readFileSync(policyfile));
    log.info(data)
    core.start(data, { store: config.store });
    res.json(_ok());
    res.end();
})


//
router.get("/stop", function (req, res) {
    if (core.state == false) {
        res.json(_err(-3, "已经停止!"))
        res.end();
    }
    core.stop();
    res.json(_ok());
    res.end();
})


module.exports = router;