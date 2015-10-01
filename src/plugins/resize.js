var self = module.exports = {
  attach: function (options) {
    this.resize = function (image, config, callback) {
      var iWidth = image.imageWidth();
      var iHeight = image.imageHeight();

      var width = config.width ? this.convertDimension(config.width, iWidth) : iWidth;
      var height = config.height ? this.convertDimension(config.height, iHeight) : iHeight;

      image.resize({ width: width, height: height });
      return callback();
    };
  }
};
