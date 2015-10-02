module.exports = {
  attach: function attach() {
    this.desaturate = function desaturate(image, config, callback) {
      image.greyscale();
      return callback();
    };
  },
};
