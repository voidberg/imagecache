var S = require('string');

var self = module.exports = {
  attach: function (options) {
    this.convertBoolean = function (value) {
      return S(value).toBool();
    };

    this.convertFloat = function (value) {
      return S(value).toFloat();
    };

    this.convertInt = function (value) {
      return S(value).toInt();
    };

    this.convertDimension = function (value, maxDimension) {
      if (S(value).endsWith('%')) {
        value = ~~(maxDimension * S(value).replace('%', '').toInt() / 100);
      }
      else {
        value = S(value).toInt();
      }

      return value;
    };

    this.convertPosition = function (value, maxPosition, imageSize) {
      imageSize = imageSize || 0;

      if (value === 'left' || value === 'top') {
        value = 0;
      }
      else if (value === 'center') {
        value = ~~(maxPosition / 2) - ~~(imageSize / 2);
      }
      else if (value === 'right' || value === 'bottom') {
        value = maxPosition;
      }
      else {
        value = this.convertDimension(value, maxPosition);
      }

      return value;
    };

  }
};
