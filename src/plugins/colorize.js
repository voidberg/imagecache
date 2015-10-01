var self = module.exports = {
  attach: function (options) {
    this.colorize = function (image, config, callback) {
      var strength = this.convertInt(config.strength);

      if (strength > 100) {
        strength = 100;
      }
      if (strength < 0) {
        strength = 0;
      }

      image.colorize(config.color, strength);
      return callback();
    };
  }
};
