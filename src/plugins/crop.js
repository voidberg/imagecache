module.exports = {
  attach: function attach() {
    this.crop = function crop(image, config, callback) {
      const iWidth = image.imageWidth();
      const iHeight = image.imageHeight();

      const width = config.width ? this.convertDimension(config.width, iWidth) : iWidth;
      const height = config.height ? this.convertDimension(config.height, iHeight) : iHeight;
      const xpos = config.xpos ? this.convertPosition(config.xpos, iWidth) : 0;
      const ypos = config.ypos ? this.convertPosition(config.ypos, iHeight) : 0;

      image.crop(width, height, xpos, ypos);
      return callback();
    };
  },
};
