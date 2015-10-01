var Caman = require('caman').Caman;
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');

var self = module.exports = {
  attach: function (options) {
    this.file = function (image, config, callback) {
      var plugin = this;

      var iWidth = image.imageWidth();
      var iHeight = image.imageHeight();

      var alpha = plugin.convertInt(config.alpha);

      fs.readFile(config.path, function(err, file){
        if (err) {
          return callback(err);
        }

        var overlay = new Image;
        overlay.src = file;

        var xpos = config.xpos ? plugin.convertPosition(config.xpos, iWidth, overlay.width) : 0;
        var ypos = config.ypos ? plugin.convertPosition(config.ypos, iHeight, overlay.height) : 0;


        var ctx = image.canvas.getContext('2d');

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
  }
};
