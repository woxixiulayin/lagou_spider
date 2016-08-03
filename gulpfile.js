var gulp = require('gulp')
    , browserSync = require('browser-sync');

// 使用默认任务启动Browsersync，监听JS文件
gulp.task('serve', function () {

    browserSync.init({
        proxy: "localhost:8082"
    });

    // 所有的浏览器重载后任务完成。
    gulp.watch(["front/**"], browserSync.reload);
});

gulp.task('default', ['serve']);