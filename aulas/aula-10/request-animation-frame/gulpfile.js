var gulp = require('gulp');
var connect = require('gulp-connect');

// Server
gulp.task('connect', function() {
    connect.server({
        root: '.',
        port: 8080,
        livereload: true
    });
});

// Updates the server
gulp.task('update', function () {
    gulp.src('.').pipe(connect.reload());
});

// Watches for changes on the source files
gulp.task('watch', function() {
    gulp.watch([ './**/*.{html,css,js}'], ['update']);
});

// Default task
gulp.task('default', ['connect', 'watch']);