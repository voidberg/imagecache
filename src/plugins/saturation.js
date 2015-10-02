module.exports = {
  attach: function attach() {
    this.saturation = function saturation(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < -100) {
        value = -100;
      }

      image.saturation(value);
      return callback();
    };
  },
};
