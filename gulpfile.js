var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer')

gulp.task('serve',function() {
    browserSync.init({
        server: "./",
        notify: false
    });
});

var handleError = function (err){
    console.log(err.toString());
    this.emit('end');
}
gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
  .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});
gulp.task('scripts', function() {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js/'));
});
gulp.task('watch', function(){
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/scripts/**/*.js', ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
gulp.task('default', function() {
	console.log('Uruchamam domyślne - zadanie gulpa');
    gulp.start(['serve', 'watch', 'scripts']);
});
