module.exports = {
  attach: function attach() {
    this.vibrance = function vibrance(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < -100) {
        value = -100;
      }

      image.vibrance(value);
      return callback();
    };
  },
};
