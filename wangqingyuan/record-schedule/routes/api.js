var express = require('express');
var router = express.Router();
var db = require("../db")
var state = true;

/**
 * 构建错误响应
 */
function _err(code, desc) {
    return { err_code: code, err_desc: desc };
}

function _ok(data) {
    return { err_code: 0, data: data };
}

router.get("/file", function (req, res) {
    db.find("tasks", { status: 10 }, function (err, docs) {
        res.json(docs);
        res.end();
    })
})

//录制状态
router.get("/state", function (req, res) {
    res.json(_ok({state : state}));
    res.end();
})

//录制状态
router.get("/state", function (req, res) {
    res.json(_ok({state : state}));
    res.end();
})


module.exports = router;