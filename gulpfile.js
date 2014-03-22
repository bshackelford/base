// Load plugins

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    lr = require('tiny-lr'),
    server = lr(),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass'),
    minifyJS = require('gulp-jsmin'),
    rename = require('gulp-rename')
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint');

// Task to minify all css files in the css directory
gulp.task('minify-css', function(){
    gulp.src('./css/*.css')
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(gulp.dest('./css/'));
});

// Task to minify all js files in the js directory
gulp.task('minify-js', function () {
    gulp.src('./js/*.js')
        .pipe(minifyJS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js/min/'));
});

// Reload html
gulp.task('reload', function(){
    gulp.src('*.html')
        .pipe(watch(function(files) {
            return files.pipe(livereload(server));
        }));
});

// Task to optmize and minify images
gulp.task('minify-img', function() {
    return gulp.src('./img/*')
        .pipe((imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./img'));
});

// Task to optimize and minify svg
gulp.task('minify-svg', function(){
    gulp.src('./img/svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./img/svg'));
});

// Task to run jshint and pipe output to terminal
gulp.task('jshint', function(){
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function(){
    gulp.src('./css/*.css')
        .pipe(csslint({
            'compatible-vendor-prefixes': false,
            'box-sizing': false,
            'important': false
        }))
        .pipe(csslint.reporter());
});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
    gulp.src('./scss/style.scss')
        .pipe(watch(function(files) {
            return files.pipe(sass({loadPath: ['./scss/'], sourcemap: true, style: "compact"}))
                .pipe(prefix())
                .pipe(gulp.dest('./css/'))
                .pipe(livereload(server));
        }));
});

/*
    DEFAULT TASK

    • Process sass and lints outputted css
    • Outputted css is run through autoprefixer
    • Sends updates to any files in directory to browser for
        automatic reloading

*/
gulp.task('default', function(){
    server.listen(35729, function (err) {
        gulp.watch(['*.html', '*/*.html', './scss/*.scss', './scss/*/*.scss', './js/*.js'], function(event) {
            gulp.run('pre-process', 'csslint', 'reload');
        });
    });
});

gulp.task('prod', function(){
    gulp.run('minify-css', 'minify-js', 'minify-img', 'minify-svg');
});
