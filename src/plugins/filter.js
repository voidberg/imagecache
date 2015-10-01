var self = module.exports = {
  attach: function (options) {
    this.filter = function (image, config, callback) {
      if (image[config.filter]) {
        if (config.value) {
          image[config.filter](config.value);
        }
        else {
          image[config.filter]();
        }
        return callback();
      }
      else {
        return callback(new Error('Filter ' + config.filter + ' not found in CamanJS. Are you missing a plugin?'));
      }
    };
  }
};
