var self = module.exports = {
  attach: function (options) {
    this.negative = function (image, config, callback) {
      image.invert();
      return callback();
    };
  }
};
