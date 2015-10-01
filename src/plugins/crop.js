
var self = module.exports = {
  attach: function (options) {
    this.crop = function (image, config, callback) {
      var iWidth = image.imageWidth();
      var iHeight = image.imageHeight();

      var width = config.width ? this.convertDimension(config.width, iWidth) : iWidth;
      var height = config.height ? this.convertDimension(config.height, iHeight) : iHeight;
      var xpos = config.xpos ? this.convertPosition(config.xpos, iWidth) : 0;
      var ypos = config.ypos ? this.convertPosition(config.ypos, iHeight) : 0;

      image.crop(width, height, xpos, ypos);
      return callback();
    };
  }
};
