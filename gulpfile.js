var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('hint', function () {
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
