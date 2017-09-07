'use strict';

const template = require('./template.marko');
const assetsJson = require('../../../public/js/assets.json');

exports.renderer = function(input, out) {
  template.render({
    type: input.type,
    src: assetsJson[input.name][input.type]
  }, out);
};
