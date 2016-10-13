var log = require("log4js").getLogger("core")
var EventEmitter = require('events').EventEmitter;
var util = require("util");
var schedule = require('node-schedule');
var fs = require("fs");
var path = require("path")
var db = require("./db")
var spawn = require('child_process').spawn
var crypto = require('crypto');
var config = require("./config.json")
Date.prototype.Format = function (fmt) {// author: meizz
    var o = {
        "M+": this.getMonth() + 1,
        // 月份
        "d+": this.getDate(),
        // 日
        "h+": this.getHours(),
        // 小时
        "m+": this.getMinutes(),
        // 分
        "s+": this.getSeconds(),
        // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function randomString(len) {
    return crypto.randomBytes(Math.ceil(Math.max(8, len * 2)))
        .toString('base64')
        .replace(/[+\/]/g, '')
        .slice(0, len);
}

function kill(pid) {
    log.debug("prepare kill:" + pid);
    if (process.platform == "win32") {
        var killproc = spawn("taskkill", ['/F', '/PID', pid + ""]);
        killproc.on('error', function (err) {
            console.log("杀死任务时出现问题" + err)
        });
    } else {
        var killproc = spawn("kill", ['-9', pid + ""]);
        killproc.on('error', function (err) {
            console.log("杀死任务时出现问题" + err)
        });
    }
}

/**
 * ffmpeg 管理
 * {bin : ffmpegbin , cmd : 命令行 ,forever : true, cwd: 工作目录}
 */
function ffmpegproc(opts) {
    this.opts = opts;
    EventEmitter.call(this);
}
util.inherits(ffmpegproc, EventEmitter);

function getbin() {
    if (process.platform == "win32") {
        return path.join(__dirname, "bin/win32", "ffmpeg.exe");
    } else {
        return path.join(__dirname, "bin/linux", "ffmpeg");
    }
}

ffmpegproc.prototype.start = function () {
    var that = this;
    that.status = "startting";
    that.lastoutput = new Date().getTime();

    try {
        log.debug("ffmpeg start." + this.opts.cmd.join(" "));
        if (this.opts.cwd)
            ffmpeg = spawn(this.opts.bin, this.opts.cmd, { cwd: this.opts.cwd });
        else
            ffmpeg = spawn(this.opts.bin, this.opts.cmd);
        log.info("start ffmpeg process!pid:" + ffmpeg.pid);
    } catch (e) {
        console.log(e);
        this.ffmpeg = null;
        return;
    }
    this.ffmpeg = ffmpeg;
    ffmpeg.stdout.on('data', function (data) {

    });

    ffmpeg.stderr.on('data', function (data) {
        //log.debug(data.toString());
        if (that.status != "started" && new Date().getTime() - this.lastoutput < 3 * 1000) //5秒之内不设置状态
            return;
        that.lastoutput = new Date().getTime();

        if (that.status != "started") {
            that.status = "started";
            if (that.cb) that.cb(that.status);
        }

    });

    ffmpeg.on('close', function (code) {
        log.warn('ffmpeg process exited with code' + code);
        this.ffmpeg = null;
        this.checkHandle = null;
        that.emit("close", that);
    });
    ffmpeg.on('error', function (err) {
        that.status = "error";
        that.emit('error', that);
    });

}

ffmpegproc.prototype.stop = function () {
    var self = this;
    if (this.ffmpeg) {
        this.ffmpeg.stdin.write('q\n');
        setTimeout(function () {
            if (self.ffmpeg){
                log.debug("force kill ffmpeg proc")
                kill(self.ffmpeg.pid);
            }
                
        }, 1500)

    }
}



var API = {
    _schedules: [],
    _proc: [],
    state: false,
    _stopTask: function (doc) {
        for (var i = 0; i < this._proc.length; i++) {
            if (this._proc[i] && this._proc[i].dbid == doc._id) {
                var setdata = {
                    status: 10,
                    end: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                    url: doc.url,
                    length: fs.lstatSync(path.join(config.store, doc.name)).size
                }
                db.update("tasks", { _id: doc._id }, { $set: setdata }, function (err) { })
                this._proc[i].stop();
                this._proc[i] = null
            }
        }
    },
    _runTask: function (savedir, doc) {
        var opts = {
            bin: getbin(),
            cmd: ['-i', doc.url, '-c:a', 'copy', '-c:v', 'copy', path.join(savedir, doc.name)]
        }
        if (doc.url.indexOf("e:\\") >= 0)
            opts.cmd = ['-re'].concat(opts.cmd)
        log.debug("runtask 执行", doc)
        this._proc[this._proc.length] = new ffmpegproc(opts);
        this._proc[this._proc.length - 1].dbid = doc._id;
        this._proc[this._proc.length - 1].start();
    },
    _scheduleTask: function (type, start, end, task) {
        //定时录制
        var self = this;
        var rule, rule2;
        if (type == 0) {
            rule = new Date(start);
            rule2 = new Date(end);
        } else {
            rule = new schedule.RecurrenceRule();
            rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
            rule.hour = parseInt(start.split(":")[0]);
            rule.minute = parseInt(start.split(":")[1]);

            rule2 = new schedule.RecurrenceRule();
            rule2.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
            rule2.hour = parseInt(end.split(":")[0]);
            rule2.minute = parseInt(end.split(":")[1]);
        }

        self._schedules[self._schedules.length] = schedule.scheduleJob(rule, function () {
            log.debug("_schedules 执行" + rule)
            var opts = {
                url: task.liveUrl,
                status: 0,
                start: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                name: randomString(8) + ".mp4"
            }
            db.insert("tasks", opts, function (err, newDoc) {
                self._runTask(self.opts.store, newDoc); //启动计划
                //增加

                self._schedules[self._schedules.length] = schedule.scheduleJob(rule2, function () {

                    self._stopTask(newDoc); //停止计划

                });

            })

        });

    },
    start: function (db, opts) {
        this.opts = opts;
        //根据db实现预约录制
        for (var i = 0; i < db.length; i++) {
            this._scheduleTask(db[i].type, db[i].start, db[i].end, db[i])
        }
        this.state = true;
    },
    stop: function () {
        for (var i = 0; i < this._schedules.length; i++) {
            this._schedules[i].cancel();
        }
        this._schedules = [];
        for (var i = 0; i < this._proc.length; i++) {
            if (this._proc[i])
                this._proc[i].stop();
        }
        this._proc = [];
        this.state = false;
    }
}

module.exports = API;