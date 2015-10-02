module.exports = {
  attach: function attach() {
    this.exposure = function exposure(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.exposure(value);
      return callback();
    };
  },
};
