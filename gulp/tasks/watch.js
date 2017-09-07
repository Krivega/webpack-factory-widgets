const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);

gulp.task('watch', () => {
  return runSequence('setwatch', 'build', () => {});
});
