var self = module.exports = {
  attach: function (options) {
    this.curves = function (image, config, callback) {
      image.curves.apply(image, config.data);
      return callback();
    };
  }
};
