var self = module.exports = {
  attach: function (options) {
    this.desaturate = function (image, config, callback) {
      image.greyscale();
      return callback();
    };
  }
};
