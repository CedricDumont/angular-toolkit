var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var karma = require('gulp-karma');

gulp.task('code', ['webserver','start-karma']);

gulp.task('webserver', function () {
    log('satrting a webserver');
    gulp.src(['.'])
        .pipe(webserver({
            livereload: true,
            fallback: './demoApp/index.html'
        }));
});

gulp.task('dist-on-save', function () {
    gulp.watch('./src/**/*.js', ['dist']);
});

gulp.task('print-debug', function () {
    console.log('debug');
});

gulp.task('dist', function () {
    return gulp.src(['./src/angular-*.js'])
        .pipe(concat('angular-toolkit-dist.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./wwwroot/demoApp/'));
});

gulp.task('start-karma', function () {
    //gulp karma igoners file that are configured in karma.conf.js
    var files = [
          './bower_components/angular/angular.js',
          './bower_components/angular-mocks/angular-mocks.js',
          './bower_components/angular-route/ngRoute.js',
          './test/utils/test-helper.js',
          './test/utils/jasmine-sinon.js', // to use sinon matchers
          './src/**/*.js',
          './test/unit/**/*.js'
    ];

    gulp.src(files)
      .pipe(karma({
          configFile: './test/karma.conf.js',
          action: 'watch'
      }));
});


//gulp.task('default', function () {
//    gulp
//        .src(['./src/**/*.js'])
//        .pipe(jscs())
//        .pipe(jshint())
//        .pipe(
//            jshint.reporter('jshint-stylish', {
//                verbose: true
//            })
//        );
//});


gulp.task('minify', function () {
    gulp.src('src/angular-toolkit.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});


function log(message) {
    console.log(message);
}