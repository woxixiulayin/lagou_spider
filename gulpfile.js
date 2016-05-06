var gulp = require('gulp')
    , browserSync = require('browser-sync');

// 使用默认任务启动Browsersync，监听JS文件
gulp.task('serve', function () {

    browserSync.init({
        proxy: "localhost:8080"
    });

    // 从这个项目的根目录启动服务器
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.watch(["**/*.js","**/*.css","**/*.html"], browserSync.reload);
});

gulp.task('default', ['serve']);