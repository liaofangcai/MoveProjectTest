var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jscsReporter = require('gulp-jscs-stylish');

gulp.task('lint', function () {
  return gulp.src([
    './src/main/webapp/scripts/app/**/*.js',
    './src/main/webapp/WEB-INF/app/**/*.js'
  ])
    .pipe(jshint()).pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs()).pipe(jscsReporter());
});

