var config = require("./config.json")
var cluster = require("cluster");
var log4js = require('log4js');
/**
 * 入口程序
 */
if (cluster.isMaster) {
    var app = require('./app');
    var fs = require("fs")
    var db = require("./db")
    var core = require("./core")
    var http = require("http")
    
    var log ;
    var numCPUs = require('os').cpus().length;
    db.config(process.cwd());

    //日志配置	
    if (!fs.existsSync("logs")) fs.mkdirSync("logs")
    log4js.configure(require("./log4js.json"));
    log = log4js.getLogger('main');

    if(!fs.existsSync('./db')){
        fs.mkdirSync('./db');
    }
    
    if(!fs.existsSync(config.store)){
        log.error("存储路径", config.store, "不存在,配置完成后请重新启动!");
        process.exit(1);
        return;
    }
    //数据库初始化
    require("./db").config("./db");



    var server = http.createServer(app);

    server.listen(config.port);
    server.on('error', function (err) {
        log.error(err.stack || err);
    });
    server.on('listening', function () {
        log.info("管理服务器已经启动", config.port)
        core.start
    });
    for (var i = 0; i < numCPUs; i++) {
        var childproc = cluster.fork();
    }
    cluster.on('listening', function (worker, address) {
        log.info('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ":" + address.port);
    });

    cluster.on('message', function (msg) {
        log.debug(msg);
    });

    cluster.on('exit', function (worker, code, signal) {
        log.debug('worker ' + worker.process.pid + ' died');
    });
} else {
    var express = require("express")
    var web = express();
    var log = log4js.getLogger("web-worker");
    web.use("/", express.static(config.store));
    var server = web.listen(config.webport, function () {
        log.info("Web服务已经启动!")
    });
    server.on('error', function () {
        log.error("web服务器启动失败,可能端口被占用!")
    });

}
