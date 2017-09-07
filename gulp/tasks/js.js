const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const webpackConfig = require('../webpack.config');

gulp.task('js', () => {
  webpackConfig.watch = global.isWatching;

  return gulpWebpack(webpackConfig, webpack)
    .pipe(gulp.dest(webpackConfig.output.path));
});
