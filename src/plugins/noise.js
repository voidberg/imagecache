module.exports = {
  attach: function attach() {
    this.noise = function noise(image, config, callback) {
      let value = this.convertInt(config.value);

      if (value < 0) {
        value = 0;
      }

      image.noise(value);
      return callback();
    };
  },
};
