module.exports = {
  attach: function attach() {
    this.brightness = function brightness(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < -100) {
        value = -100;
      }

      image.brightness(value);
      return callback();
    };
  },
};
