var self = module.exports = {
  attach: function (options) {
    this.scale_and_crop = function (image, config, callback) {
      var plugins = this;

      if (!plugins.scale || !plugins.crop) {
        return callback(new Error('This plugin requires the scale and crop plugins.'));
      }

      var iWidth = image.imageWidth();
      var iHeight = image.imageHeight();

      var width = config.width ? plugins.convertDimension(config.width, iWidth) : iWidth;
      var height = config.height ? plugins.convertDimension(config.height, iHeight) : iHeight;

      var scale = Math.max(width / iWidth, height / iHeight);
      var xpos = ~~(iWidth * scale - width) / 2;
      var ypos = ~~(iHeight * scale - height) / 2;

      plugins.scale(image, { width: ~~(iWidth * scale), height: ~~(iHeight * scale) }, function () {
        plugins.crop(image, { width: width, height: height, xpos: xpos, ypos: ypos }, function () {
          return callback();
        });
      });
    };
  }
};
