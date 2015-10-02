module.exports = {
  attach: function attach() {
    this.colorize = function colorize(image, config, callback) {
      let strength = this.convertInt(config.strength);

      if (strength > 100) {
        strength = 100;
      }
      if (strength < 0) {
        strength = 0;
      }

      image.colorize(config.color, strength);
      return callback();
    };
  },
};
