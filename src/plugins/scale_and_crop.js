module.exports = {
  attach: function attach() {
    this.scale_and_crop = function scaleAndCrop(image, config, callback) {
      const plugins = this;

      if (!plugins.scale || !plugins.crop) {
        return callback(new Error('This plugin requires the scale and crop plugins.'));
      }

      const iWidth = image.imageWidth();
      const iHeight = image.imageHeight();

      const width = config.width ? plugins.convertDimension(config.width, iWidth) : iWidth;
      const height = config.height ? plugins.convertDimension(config.height, iHeight) : iHeight;

      const scale = Math.max(width / iWidth, height / iHeight);
      const xpos = ~~(iWidth * scale - width) / 2;
      const ypos = ~~(iHeight * scale - height) / 2;

      plugins.scale(image, { width: ~~(iWidth * scale), height: ~~(iHeight * scale) }, function scaleCallback() {
        plugins.crop(image, { width: width, height: height, xpos: xpos, ypos: ypos }, function cropCallback() {
          return callback();
        });
      });
    };
  },
};
