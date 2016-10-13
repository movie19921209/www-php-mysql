var mylibdir = process.env['MYLIB_HOME']
var path = require("path"),  
    myutil  = require(path.join(mylibdir,"myutil")),   
    fs = require("fs"),spawn = require('child_process').spawn;
var srcdir,	builddir,	distdir,installdir , installbuilddir ,uibuilddir;
var servicemainfile,uimainfile;
var spawn = require('child_process').spawn,exec = require('child_process').exec
function prepare(callback){
	
	srcdir   = path.join(process.cwd())	
	builddir = path.join(process.cwd(), "build")	
	distdir = path.join(process.cwd(), "dist")
	
	
	myutil.emptyDir(builddir)
	myutil.emptyDir(distdir)
	
	callback()
}
//打包服务


function step1(callback) {
	
	/**
	fs.unlinkSync(path.join(builddir, "app.js"));
	fs.unlinkSync(path.join(builddir, "db.js"));
	fs.unlinkSync(path.join(builddir, "data.txt"));
	fs.unlinkSync(path.join(builddir, "tasks.db"));
	fs.unlinkSync(path.join(builddir, "core.js"));
	fs.unlinkSync(path.join(builddir, "main.js"));
	fs.unlinkSync(path.join(builddir, "myutil.js"));
	fs.unlinkSync(path.join(builddir, "routest", "admin.js"));
	fs.unlinkSync(path.join(builddir, "routest", "api.js"));
	fs.unlinkSync(path.join(builddir, "routest", "index.js"));
	*/
	// jx package main.js --add db.js --add core.js --add  myutil.js  --add "routes/*" --native
	var cmd = 'jx package main.js --add "./*.js" --slim "node_modules/*,public/*,test/*,buildlinux.js" --name "recordserver" --native';
	var childproc = exec(cmd, { cwd: srcdir }, function (err, stdout, stderr) {
		if (err) {
			console.log("recordserver生成错误" + err)
			callback(err);
			return;

		}
		myutil.copy(path.join(srcdir, "node_modules"), path.join(builddir,'work',"node_modules"));
		myutil.copy(path.join(srcdir, "views"), path.join(builddir,'work',"views"));
		myutil.copy(path.join(srcdir, "public"), path.join(builddir,'work',"public"));
		myutil.copy(path.join(srcdir, "log4js.json"), path.join(builddir,'work',"log4js.json"));
		myutil.copy(path.join(srcdir, "config.json"), path.join(builddir,'work',"config.json"));
		myutil.copy(path.join(srcdir, "start.sh"), path.join(builddir,'bin',"start.sh"));
		myutil.copy(path.join(srcdir, "stop.sh"), path.join(builddir,'bin',"stop.sh"));
		myutil.copy(path.join(srcdir, "recordserver"), path.join(builddir,'work',"recordserver"));
		myutil.copy(path.join(srcdir, "bin/linux"), path.join(builddir,'work',"bin/linux"));
		//console.log(stdout)
		fs.unlinkSync(path.join(srcdir, "recordserver.jxp"));
		fs.unlinkSync(path.join(srcdir, "recordserver"));
		//fs.unlinkSync(path.join(srcdir, "videoserver.jx"));
		callback();
	})

}

function steppackage(callback){
	var childenv = {}		
	var coreversion = "recordserver.tar.gz"
	childenv["cwd"] = builddir;
	cmd = ['-czf', coreversion , 'bin', 'work']
	childproc   = spawn("tar", cmd, childenv);
	childproc.stdout.on('data', function (data) {
		//console.info(data);
	});
	childproc.stderr.on('data', function (data) {
		//console.info(data);
	});
	childproc.on('exit', function (data) {		
		myutil.copy(path.join(builddir,coreversion), path.join(distdir, coreversion))		
		//myutil.emptyDir(builddir);
		console.log("打包完成 ")
		callback(null,null)
	});

}


var asyncFunc = [prepare, step1, steppackage];

myutil.async.series(asyncFunc, function(err, values) {		
	console.log(err)
});
