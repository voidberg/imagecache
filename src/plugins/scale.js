var self = module.exports = {
  attach: function (options) {
    this.scale = function (image, config, callback) {
      var iWidth = image.imageWidth();
      var iHeight = image.imageHeight();
      var ratio = iWidth / iHeight;

      var maxWidth = config.maxWidth ? this.convertDimension(config.maxWidth, iWidth) : 0;
      var maxHeight = config.maxHeight ? this.convertDimension(config.maxHeight, iHeight) : 0;
      var width = config.width ? this.convertDimension(config.width, iWidth) : 0;
      var height = config.height ? this.convertDimension(config.height, iHeight) : 0;
      var upscale = config.upscale ? this.convertBool(config.upscale) : true;

      if (!width && !height && (!maxWidth && !maxHeight)) {
        return;
      }

      if (!upscale) {
        if (width > iWidth || height > iHeight) {
          return;
        }
      }

      if (maxWidth && maxHeight) {
        if (iWidth > iHeight) {
          width = maxWidth;
        }
        else {
          height = maxHeight;
        }
      }

      if (width === 0) {
        width = height * ratio;
      }
      else if (height === 0) {
        height = width / ratio;
      }

      image.resize({ width: width, height: height });
      return callback();
    };
  }
};
