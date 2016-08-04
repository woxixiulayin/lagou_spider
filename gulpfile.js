var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    spawn = require('child_process').spawn;

// exec("pwd", function (error, stdout, stderr)


// 使用默认任务启动Browsersync，监听JS文件
gulp.task('sync', () => {

    browserSync.init({
        proxy: "localhost:8082"
    });

    // 所有的浏览器重载后任务完成。
    gulp.watch(["front/**"], browserSync.reload);
});

//开始服务器，如果服务器代码有改动则重启
gulp.task('observer', () => {
    var server = spawn("node",[process.cwd() + '/app.js']);
    console.log(server);
    var reboot = () => {
        server.exit(1);
        server = spawn("node",[process.cwd() + '/app.js']);
    }
    gulp.watch(["app.js", "server/*.js"], [reboot, browserSync.reload]);
});

gulp.task('default', ['sync', 'observer']);