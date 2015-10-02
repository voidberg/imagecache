module.exports = {
  attach: function attach() {
    this.negative = function negative(image, config, callback) {
      image.invert();
      return callback();
    };
  },
};
