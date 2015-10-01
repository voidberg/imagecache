var self = module.exports = {
  attach: function (options) {
    this.noise = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value < 0) {
        value = 0;
      }

      image.noise(value);
      return callback();
    };
  }
};
