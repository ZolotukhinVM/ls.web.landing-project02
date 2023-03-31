const { src, dest, task, series, watch, parallel } = require('gulp'); //подключение файла
const rm = require('gulp-rm'); //очищение файлов
const sass = require('gulp-sass')(require('sass')); //препроцессор
const concat = require('gulp-concat'); //склейка файлов
const browserSync = require('browser-sync').create(); //сервер
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob'); // import media - работает, но надо поправить ошибки в миксинах
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer'); //автопрефиксер
const gcmq = require('gulp-group-css-media-queries'); //групировка media --------------не работает
const cleanCSS = require('gulp-clean-css'); //минификация css
const sourcemaps = require('gulp-sourcemaps'); // sourcemaps
const uglify = require('gulp-uglify'); //минимизация js
const px2rem = require('gulp-smile-px2rem'); //px 2 rem -----------------криво работает делать через rem()
const gulpif = require('gulp-if'); //возможность подключения пакетов в зависимости от условия (dev or prod)

const env = process.env.NODE_ENV; //переменный среды npm 
const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config'); //конфиг файл gulp

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe( rm() );
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH)).pipe(reload({stream: true}));
});

task('styles', () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem()) //работает, но сбрасывает html font-size
    .pipe(gulpif(env === 'dev', autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
			cascade: false
		})))
    // .pipe(gcmq())
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`./${DIST_PATH}/styles`))
    .pipe(reload({stream: true}));
});

task('scripts', () => {
  return src([...JS_LIBS, `${SRC_PATH}/scripts/**/*.js`])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js', {newline: ';'}))
  // .pipe(babel({presets: ['@babel/env']}))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(`./${DIST_PATH}/scripts`))
  .pipe(reload({stream: true}));
});

task('images', () => {
  return src(`./${SRC_PATH}/images/**/*`)
  .pipe(dest(`./${DIST_PATH}/images`));
});

task('serv', () => {
  browserSync.init({
      server: {
          baseDir: DIST_PATH
      },
      // open: false
  });
});

task('watch', () => {
  watch(`./${SRC_PATH}/styles/**/*.scss`, series('styles'));
  watch(`./${SRC_PATH}/*.html`, series('copy:html'));
  watch(`./${SRC_PATH}/scripts/**/*.js`, series('scripts'));
})

task(
  'default', series('clean',
  parallel('copy:html', 'styles', 'scripts', 'images'), 
  parallel('watch', 'serv'))
);
 
task(
  'build', series('clean',
  parallel('copy:html', 'styles', 'scripts', 'images'), 'serv')
);