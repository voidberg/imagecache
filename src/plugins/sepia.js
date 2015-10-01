var self = module.exports = {
  attach: function (options) {
    this.sepia = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.sepia(value);
      return callback();
    };
  }
};
