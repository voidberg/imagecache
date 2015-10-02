module.exports = {
  attach: function attach() {
    this.resize = function resize(image, config, callback) {
      const iWidth = image.imageWidth();
      const iHeight = image.imageHeight();

      const width = config.width ? this.convertDimension(config.width, iWidth) : iWidth;
      const height = config.height ? this.convertDimension(config.height, iHeight) : iHeight;

      image.resize({ width: width, height: height });
      return callback();
    };
  },
};
