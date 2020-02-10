'use strict';

const gulp       	 = require('gulp'),
        browserSync	 = require('browser-sync').create(),
        sass       	 = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        rigger       = require('gulp-rigger'),
        cleanCSS     = require('gulp-clean-css'),
        rename       = require('gulp-rename'),
        imagemin     = require('gulp-imagemin'),
        clean        = require('gulp-clean'),
        pngquant     = require('imagemin-pngquant'),
        zopfli       = require('imagemin-zopfli'),
        mozjpeg      = require('imagemin-mozjpeg'),
        giflossy     = require('imagemin-giflossy'),
        jpegtran     = require('imagemin-jpegtran'),
        uglify       = require('gulp-uglify-es').default,
        sourcemaps   = require('gulp-sourcemaps');

gulp.task('clean-css', function() {
    return gulp.src('dist/css', {allowEmpty: true})
               .pipe(clean());
});

gulp.task('sass', gulp.series('clean-css', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(cleanCSS({
                debug: true,
                level: {1: {specialComments: 0}}
            }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename({
            suffix : '.min'
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}));

gulp.task('clean-html', function() {
    return gulp.src('dist/*.html', {allowEmpty: true})
               .pipe(clean());
});

gulp.task('html', gulp.series('clean-html', function() {
    return gulp.src([
        'src/**/*.html',
        '!src/partials/_*.html'])
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}));

gulp.task('clean-img', function() {
    return gulp.src('dist/img', {allowEmpty: true})
               .pipe(clean());
});

gulp.task('img', gulp.series('clean-img', function() {
    return gulp.src('src/favicon.ico')
            .pipe(gulp.dest('dist')) &&
        gulp.src('src/img/**/*.*')
        .pipe(imagemin([
            pngquant({
                speed: 1,
                quality: [0.95, 1]
            }),
            zopfli({more: true}),
            giflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            jpegtran({
                progressive: true
            }),
            mozjpeg({
                quality: 90
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}));

gulp.task('clean-fonts', function() {
    return gulp.src('dist/fonts', {allowEmpty: true})
               .pipe(clean());
});

gulp.task('fonts', gulp.series('clean-fonts', function() {
    return gulp.src('src/fonts/**/*.*')
               .pipe(gulp.dest('dist/fonts'))
               .pipe(browserSync.stream())
}));

gulp.task('clean-js', function() {
    return gulp.src('dist/js', {allowEmpty: true})
               .pipe(clean());
});

gulp.task('js', gulp.series('clean-js', function() {
    return gulp.src('src/js/main.js')
               .pipe(sourcemaps.init())
               .pipe(rigger())
               .pipe(gulp.dest("dist/js"))
               .pipe(uglify())
               .pipe(rename({
                   suffix: '.min'
               }))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest("dist/js"))
               .pipe(browserSync.stream())
}));

gulp.task('clean', function() {
    return gulp.src('dist',{allowEmpty: true })
        .pipe(clean());
});

// Static Server + watching files
gulp.task('serve', gulp.series('html', 'sass', 'img', 'fonts', 'js', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/**/*.scss", gulp.parallel('sass'));
    gulp.watch("src/**/*.html", gulp.parallel('html'));
    gulp.watch("src/img/**/*.*", gulp.parallel('img'));
    gulp.watch("src/fonts/**/*.*", gulp.parallel('fonts'));
    gulp.watch("src/js/**/*.*", gulp.parallel('js'));
}));


gulp.task('default', gulp.series('serve'));