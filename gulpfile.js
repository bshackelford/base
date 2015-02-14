// Load plugins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    lr = require('tiny-lr'),
    server = lr(),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyJS = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    critical = require('critical');

// Task to minify all css files in the css directory
gulp.task('minify-css', function() {
    gulp.src('./css/*.css')
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(gulp.dest('./css/'));
});

// Task to minify all js files in the js directory
gulp.task('minify-js', function () {
    gulp.src('./js/script.js')
        .pipe(minifyJS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./js/'));
});

// Reload html
gulp.task('reload', function() {
    gulp.src('*.html', '*/*.html', '*.php', '*/*.php')
        .pipe(livereload(server));
});

// Task to optmize and minify images
gulp.task('minify-img', function() {
    return gulp.src('./images/*')
        .pipe((imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./images/'));
});

// Task to optimize and minify svg
gulp.task('minify-svg', function() {
    gulp.src('./images/svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./images/'));
});

// Task to run jshint and pipe output to terminal
gulp.task('jshint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function() {
    gulp.src('./css/*.css')
        .pipe(csslint({
            'compatible-vendor-prefixes': false,
            'box-sizing': false,
            'important': false
        }))
        .pipe(csslint.reporter());
});

// Task that compiles Sass files down to good old CSS
gulp.task('pre-process', function() {
    gulp.src('./sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'));
});

// Inline critical-path CSS
gulp.task('critical', function (cb) {
    critical.inline({
        base: '/',
        src: 'index.php',
        dest: 'inlined.php'
    });
});

// Default task
gulp.task('default', function() {
    server.listen(35729, function (err) {
        gulp.start('pre-process', 'csslint');
        gulp.watch(['*.html', '*/*.html', '*.php', '*/*.php', './js/*.js'], ['reload']);
        gulp.watch(['./sass/*.scss', './sass/*/*.scss'], ['pre-process', 'csslint', 'reload']);
    });
});

// Pre-prod task
gulp.task('prod', function() {
    gulp.start('pre-process', 'minify-css', 'minify-js', 'minify-img', 'minify-svg');
});
