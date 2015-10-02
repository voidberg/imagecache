module.exports = {
  attach: function attach() {
    this.clip = function clip(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.clip(value);
      return callback();
    };
  },
};
