const gulp = require('gulp');
const path = require('path');
const directoryMap = require('gulp-directory-map');
const wrap = require('gulp-wrap');
const rename = require('gulp-rename');

const { src, dest } = require('../config');
const root = path.resolve(__dirname, '../../');

gulp.task('factory-widgets', () => {
  function factory(type) {
    return gulp
      .src(path.resolve(root, `${src.js}/widgets/${type}/**`))
      .pipe(directoryMap())
      .pipe(
        wrap({ src: path.resolve(root, `gulp/templates/widgets-${type}.jst`) })
      )
      .pipe(rename(`widgets-${type}.js`))
      .pipe(gulp.dest(path.resolve(root, `${src.js}/widgets/`)));
  }

  factory('common');
  factory('lazy');
});
