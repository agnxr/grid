const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
/*const autoprefixer = require('gulp-autoprefixer'); */
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');

const handleError = function(err) {
    console.log(gutil.colors.red(err.toString()));
    this.emit('end');
}

gulp.task('server', function() {
    browserSync.init({
        server: ".",
        notify: false,
        //host: '192.168.0.24', //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000,
        open: true //czy otwierac strone
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(plumber({
             errorHandler: handleError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //nested, expanded, compact, compressed
        }))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});


gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});


gulp.task('default', function() {
    console.log('====== Rozpoczynam prace =======');
    gulp.start(['sass', 'watch', 'server']);
});
