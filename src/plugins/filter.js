module.exports = {
  attach: function attach() {
    this.filter = function filter(image, config, callback) {
      if (image[config.filter]) {
        if (config.value) {
          image[config.filter](config.value);
        } else {
          image[config.filter]();
        }
        return callback();
      }

      return callback(new Error('Filter ' + config.filter + ' not found in CamanJS. Are you missing a plugin?'));
    };
  },
};
