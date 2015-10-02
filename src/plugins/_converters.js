const S = require('string');

module.exports = {
  attach: function attach() {
    this.convertBoolean = function convertBoolean(value) {
      return S(value).toBool();
    };

    this.convertFloat = function convertFloat(value) {
      return S(value).toFloat();
    };

    this.convertInt = function convertInt(value) {
      return S(value).toInt();
    };

    this.convertDimension = function convertDimension(value, maxDimension) {
      let converted;

      if (S(value).endsWith('%')) {
        converted = ~~(maxDimension * S(value).replace('%', '').toInt() / 100);
      } else {
        converted = S(value).toInt();
      }

      return converted;
    };

    this.convertPosition = function convertPosition(value, maxPosition, imageSize = 0) {
      let converted;

      if (value === 'left' || value === 'top') {
        converted = 0;
      } else if (value === 'center') {
        converted = ~~(maxPosition / 2) - ~~(imageSize / 2);
      } else if (value === 'right' || value === 'bottom') {
        converted = maxPosition;
      } else {
        converted = this.convertDimension(value, maxPosition);
      }

      return converted;
    };
  },
};
