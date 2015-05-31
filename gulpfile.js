// include gulp
var gulp = require('gulp'); 

// include Our plugins
var jshint = require('gulp-jshint');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile our sass plugins to css
gulp.task('sass-plugins', function() {
  return gulp.src('assets/styles/development/sass/_plugins/*.scss')
    .pipe(sass())
    .pipe(rename('plugins.css'))
    .pipe(gulp.dest('assets/styles/developmentcss'))
    .pipe(minify())
    .pipe(rename('plugins.min.css'))
    .pipe(gulp.dest('assets/styles/production'));
});

// compile our site sass
gulp.task('sass', function() {
  return gulp.src('assets/styles/development/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/styles/development/css'))
    .pipe(minify())
    .pipe(rename(function (path) {
      path.extname = ".min.css"
    }))
    .pipe(gulp.dest('assets/styles/production'));
});

// lint task
gulp.task('lint', function() {
  return gulp.src('assets/scripts/development/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// concatenate & minify js plugins
gulp.task('js-plugins', function() {
  return gulp.src('assets/scripts/development/_plugins/*.js')
    .pipe(concat('_plugins.js'))
    .pipe(gulp.dest('assets/scripts/development'))
    .pipe(rename('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/production'));
});

// concatenate & minify js
gulp.task('scripts', function() {
  return gulp.src('assets/scripts/development/*.js')
    .pipe(rename(function (path) {
        path.extname = ".min.js"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/production'));
});

// watch files For changes
gulp.task('watch', function() {
  gulp.watch('assets/styles/development/sass/plugins/*.scss', ['sass-plugins']);
  gulp.watch('assets/styles/development/sass/*.scss', ['sass']);
  gulp.watch('assets/styles/development/sass/_plugins/*.js', ['js-plugins']);
  gulp.watch('assets/scripts/development/_plugins/*.js', ['lint', 'js-plugins']);
  gulp.watch('assets/scripts/development/*.js', ['lint', 'scripts']);
});

// default task
gulp.task('default', ['sass-plugins', 'sass', 'lint', 'js-plugins', 'scripts', 'watch']);