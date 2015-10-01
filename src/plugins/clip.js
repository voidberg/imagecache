var self = module.exports = {
  attach: function (options) {
    this.clip = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.clip(value);
      return callback();
    };
  }
};
