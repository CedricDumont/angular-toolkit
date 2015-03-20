var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('webserver', function () {
    log('satrting a webserver');
    gulp.src(['build', 'src'])
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html'
        }));
});

gulp.task('dist', function () {
    return gulp.src(['./src/angular-*.js'])
        .pipe(concat('angular-toolkit-dist.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('default', function () {
    gulp
        .src(['./src/**/*.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(
            jshint.reporter('jshint-stylish', {
                verbose: true
            })
        );
});

/*
gulp.task('minify', function () {
    gulp.src('src/angular-toolkit.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});
*/

function log(message) {
    console.log(message);
}