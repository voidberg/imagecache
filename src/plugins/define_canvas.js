const Canvas = require('canvas');
const Image = Canvas.Image;

module.exports = {
  attach: function attach() {
    this.define_canvas = function defineCanvas(image, config, callback) {
      const plugin = this;

      const iWidth = image.imageWidth();
      const iHeight = image.imageHeight();

      let tWidth;
      let tHeight;
      let tXpos;
      let tYpos;

      if (config.exact.width || config.exact.height) {
        tWidth = !config.exact.width ? iWidth : plugin.convertDimension(config.exact.width, iWidth);
        tHeight = !config.exact.width ? iHeight : plugin.convertDimension(config.exact.height, iHeight);
      } else {
        const leftDiff = config.relative.left ? plugin.convertDimension(config.relative.left, iWidth) : 0;
        const rightDiff = config.relative.right ? plugin.convertDimension(config.relative.right, iWidth) : 0;
        const topDiff = config.relative.top ? plugin.convertDimension(config.relative.top, iHeight) : 0;
        const bottomDiff = config.relative.bottom ? plugin.convertDimension(config.relative.bottom, iHeight) : 0;

        tWidth = iWidth + leftDiff + rightDiff;
        tHeight = iHeight + topDiff + bottomDiff;
        tXpos = leftDiff;
        tYpos = topDiff;
      }

      image.render(function render() {
        const img = new Image;
        img.src = image.canvas.toBuffer();

        if (config.exact.width || config.exact.height) {
          tXpos = config.exact.xpos ? plugin.convertPosition(config.exact.xpos, tWidth, image.canvas.width) : 0;
          tYpos = config.exact.ypos ? plugin.convertPosition(config.exact.ypos, tHeight, image.canvas.height) : 0;
        }

        image.canvas.width = tWidth;
        image.canvas.height = tHeight;

        const ctx = image.canvas.getContext('2d');
        ctx.fillStyle = config.color;
        ctx.fillRect(0, 0, tWidth, tHeight);

        ctx.drawImage(img, tXpos, tYpos);

        image.reloadCanvasData();

        return callback();
      });
    };
  },
};
