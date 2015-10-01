var self = module.exports = {
  attach: function (options) {
    this.gamma = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value < 0) {
        value = 0;
      }

      image.gamma(value);
      return callback();
    };
  }
};
