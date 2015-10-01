var self = module.exports = {
  attach: function (options) {
    this.exposure = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.exposure(value);
      return callback();
    };
  }
};
