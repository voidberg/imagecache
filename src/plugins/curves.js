module.exports = {
  attach: function attach() {
    this.curves = function curves(image, config, callback) {
      image.curves.apply(image, config.data);
      return callback();
    };
  },
};
