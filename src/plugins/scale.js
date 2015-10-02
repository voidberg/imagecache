module.exports = {
  attach: function attach() {
    this.scale = function scale(image, config, callback) {
      const iWidth = image.imageWidth();
      const iHeight = image.imageHeight();
      const ratio = iWidth / iHeight;

      const maxWidth = config.maxWidth ? this.convertDimension(config.maxWidth, iWidth) : 0;
      const maxHeight = config.maxHeight ? this.convertDimension(config.maxHeight, iHeight) : 0;
      let width = config.width ? this.convertDimension(config.width, iWidth) : 0;
      let height = config.height ? this.convertDimension(config.height, iHeight) : 0;
      const upscale = config.upscale ? this.convertBool(config.upscale) : true;

      if (!width && !height && (!maxWidth && !maxHeight)) {
        return callback();
      }

      if (!upscale) {
        if (width > iWidth || height > iHeight) {
          return callback();
        }
      }

      if (maxWidth && maxHeight) {
        if (iWidth > iHeight) {
          width = maxWidth;
        } else {
          height = maxHeight;
        }
      }

      if (width === 0) {
        width = height * ratio;
      } else if (height === 0) {
        height = width / ratio;
      }

      image.resize({ width: width, height: height });
      return callback();
    };
  },
};
