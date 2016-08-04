'use strict'
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    spawn = require('child_process').spawn,
    fs = require('fs');

// exec("pwd", function (error, stdout, stderr)


// 使用默认任务启动Browsersync，监听JS文件
gulp.task('sync', () => {

    browserSync.init({
        proxy: "localhost:8082"
    });

    // 所有的浏览器重载后任务完成。
    gulp.watch(["src/**"], browserSync.reload);
});

//开始服务器，如果服务器代码有改动则重启
gulp.task('observer', () => {
    let server = () => {
        //stdio将子进程的输入输出重定向到父进程
        return  spawn("node", [process.cwd() + '/app.js'], {stdio: [0, process.stdout , process.stderr]});
    };
    let myserver = server(),
        reboot = () => {
        myserver.kill('SIGHUP');
        myserver = server();
        browserSync.reload();
        };
    gulp.watch(["app.js", "server/*.js"], reboot);
});

gulp.task('default', ['sync', 'observer']);