var Caman = require('caman').Caman;
var Canvas = require('canvas');
var Image = Canvas.Image;

var self = module.exports = {
  attach: function (options) {
    this.define_canvas = function (image, config, callback) {
      var plugin = this;

      var iWidth = image.imageWidth();
      var iHeight = image.imageHeight();

      var tWidth, tHeight, tXpos, tYpos;

      if (config.exact.width || config.exact.height) {
        tWidth = !config.exact.width ? iWidth : plugin.convertDimension(config.exact.width, iWidth);
        tHeight = !config.exact.width ? iHeight : plugin.convertDimension(config.exact.height, iHeight);
      }
      else {
        var leftDiff = config.relative.left ? plugin.convertDimension(config.relative.left, iWidth) : 0;
        var rightDiff = config.relative.right ? plugin.convertDimension(config.relative.right, iWidth) : 0;
        var topDiff = config.relative.top ? plugin.convertDimension(config.relative.top, iHeight) : 0;
        var bottomDiff = config.relative.bottom ? plugin.convertDimension(config.relative.bottom, iHeight) : 0;

        tWidth = iWidth + leftDiff + rightDiff;
        tHeight = iHeight + topDiff + bottomDiff;
        tXpos = leftDiff;
        tYpos = topDiff;
      }

      image.render(function () {
        var img = new Image;
        img.src = image.canvas.toBuffer();

        if (config.exact.width || config.exact.height) {
          tXpos = config.exact.xpos ? plugin.convertPosition(config.exact.xpos, tWidth, image.canvas.width) : 0;
          tYpos = config.exact.ypos ? plugin.convertPosition(config.exact.ypos, tHeight, image.canvas.height) : 0;
        }

        image.canvas.width = tWidth;
        image.canvas.height = tHeight;

        var ctx = image.canvas.getContext('2d');
        ctx.fillStyle = config.color;
        ctx.fillRect(0, 0, tWidth, tHeight);

        ctx.drawImage(img, tXpos, tYpos);

        image.reloadCanvasData();

        return callback();
      });
    };
  }
};
