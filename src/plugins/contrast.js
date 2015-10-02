module.exports = {
  attach: function attach() {
    this.contrast = function contrast(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < -100) {
        value = -100;
      }

      image.contrast(value);
      return callback();
    };
  },
};
