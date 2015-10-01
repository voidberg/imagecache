const Caman = require('caman').Caman;
const broadway = require('broadway');
const async = require('async');

module.exports = class ImageCache {
  /**
   * constructor() returns a new ImageCache
   * instance with a list of presets.
   *
   * @param {Object} presets
   * @return {ImageCache} instance
   */
  constructor(presets) {
    this._presets = presets;
    this._plugins = new broadway.App;
    this._pluginNames = [];

    require('fs').readdirSync(__dirname + '/plugins/').forEach((file) => {
      let name;
      let plugin;

      if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
        name = file.replace('.js', '');
        plugin = require('./plugins/' + file);

        this._pluginNames.push(name);
        this._plugins.use(plugin);
      }
    });

    this._plugins.init((err) => {
      if (err) {
        throw err;
      }
    });
  }

  /**
   * presets() returns a list
   * of all available presets.
   *
   * @return {Array} list of presets
   */
  presets() {
    return Object.getOwnPropertyNames(this._presets);
  }

  /**
   * plugins() returns a list
   * of all available plugins.
   *
   * @return {Array} list of plugins
   */
  plugins() {
    return this._pluginNames;
  }

  /**
   * render() renders an image
   * using the supplied preset.
   *
   * @param {String} image
   * @param {String} presetName
   * @param {String} callback
   */
  render(image, presetName, callback) {
    const self = this;
    let preset;

    if (!this._presets[presetName]) {
      return callback(new Error('Preset ' + presetName + ' could not be found.'));
    }

    preset = this._presets[presetName];

    Caman(image, function imageLoaded() {
      const imageObj = this;

      async.each(preset.actions, (action, asyncCallback) => {
        if (!self._plugins[action.action]) {
          return asyncCallback(new Error('Action ' + action.action + ' for preset ' + presetName + ' not found in loaded plugins.'));
        }

        self._plugins[action.action](imageObj, action.config, asyncCallback);
      },
      (err) => {
        if (err) {
          callback(err);
        } else {
          imageObj.render(function render() {
            callback(null, imageObj);
          });
        }
      });
    });
  }
};
