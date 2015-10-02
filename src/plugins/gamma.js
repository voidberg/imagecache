module.exports = {
  attach: function attach() {
    this.gamma = function gamma(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value < 0) {
        value = 0;
      }

      image.gamma(value);
      return callback();
    };
  },
};
