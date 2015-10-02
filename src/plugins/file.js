const Canvas = require('canvas');
const Image = Canvas.Image;
const fs = require('fs');

module.exports = {
  attach: function attach() {
    this.file = function file(image, config, callback) {
      const plugin = this;

      const iWidth = image.imageWidth();
      const iHeight = image.imageHeight();

      const alpha = plugin.convertInt(config.alpha);

      fs.readFile(config.path, function readFileCallback(err, contents) {
        if (err) {
          return callback(err);
        }

        const overlay = new Image;
        overlay.src = contents;

        const xpos = config.xpos ? plugin.convertPosition(config.xpos, iWidth, overlay.width) : 0;
        const ypos = config.ypos ? plugin.convertPosition(config.ypos, iHeight, overlay.height) : 0;


        const ctx = image.canvas.getContext('2d');

        if (alpha !== 100) {
          ctx.globalAlpha = 0.4;
        }

        ctx.drawImage(overlay, xpos, ypos, overlay.width, overlay.height);

        if (alpha !== 100) {
          ctx.restore();
        }

        image.reloadCanvasData();

        return callback();
      });
    };
  },
};
