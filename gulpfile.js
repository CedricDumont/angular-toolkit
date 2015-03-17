var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    log('satrting a webserver');
  gulp.src('src')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html'
    }));
})

gulp.task('default', function () {
    gulp
        .src(['./src/**/*.js', './*.js'])
        .pipe(jscs())
        .pipe(jshint())
        .pipe(
            jshint.reporter('jshint-stylish', {
                verbose: true
            })
        );
});

gulp.task('minify', function () {
    gulp.src('src/angular-toolkit.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

function log(message){
    console.log(message);
};
