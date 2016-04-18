'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const browserSync = require("browser-sync");
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const del = require('del');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const path = require('path');
const csscomb = require('gulp-csscomb'); 
const lessReporter = require('gulp-less-reporter');
const streamqueue = require('streamqueue');
const rigger = require('gulp-rigger');
const size = require('gulp-size');


const reload = browserSync.reload;


const pathProj = {
      build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
      },
      src: { 
        html: 'src/html/**/*.html', 
        js: 'src/js/**.js',
        style: 'src/style/**/main.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
      },
      watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
      },
      clean: ['build/**/*', '!build/.gitignore'],
  };

const config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

// Настройка BrowserSync
gulp.task('webserver', function () {
    browserSync(config);
});

//Компиляция LESS
gulp.task('less', function() {
    return gulp.src(pathProj.src.style)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'style', 'less-blocks','bootstrap', 'mixins') ]
        }))
        .on('error', lessReporter)
        .pipe(autoprefixer('> 2%'))
        .pipe(csscomb())
        .pipe(gulp.dest(pathProj.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(pathProj.build.css))
        .pipe(reload({stream: true}));
});

  // Копирование и оптимизация изображений
gulp.task('img', function () {
    return gulp.src(pathProj.src.img)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(pathProj.build.img))
        .pipe(reload({stream: true}));
});

// Сборка HTML
gulp.task('html', function() {
  gulp.src(pathProj.src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(pathProj.build.html));
});

// Очистка папки сборки
gulp.task('clean', function () {
  return del([
    pathProj.build + '/**/*',
    '!' + pathProj.build + '/readme.md'
  ]);
});

//Сборка и оптимизация JS

gulp.task('js', function () {
gulp.src(pathProj.src.js)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(pathProj.build.js));
});

    /*gulp.src(pathProj.src.js) 
        .pipe(concat(pathProj.build.jsMainFile))
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(pathProj.build.js)) 
        .pipe(reload({stream: true}));
});
*/


// Копирование шрифтов
gulp.task('fonts', function() {
    gulp.src(pathProj.src.fonts)
        .pipe(gulp.dest(pathProj.build.fonts))
});

// Сборка всего
gulp.task('build', [
    'clean',
    'html',
    'js',
    'less',
    'fonts',
    'img'
]);

//Слежение
gulp.task('watch', function(){
    watch([pathProj.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([pathProj.watch.style], function(event, cb) {
        gulp.start('less');
    });
    watch([pathProj.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([pathProj.watch.img], function(event, cb) {
        gulp.start('img');
    });
    watch([pathProj.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});


//Задача default
gulp.task('default', ['webserver', 'watch']);





