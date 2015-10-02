module.exports = {
  attach: function attach() {
    this.sepia = function sepia(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.sepia(value);
      return callback();
    };
  },
};
