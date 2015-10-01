var self = module.exports = {
  attach: function (options) {
    this.saturation = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < -100) {
        value = -100;
      }

      image.saturation(value);
      return callback();
    };
  }
};