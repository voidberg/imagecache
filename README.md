[![Stories in Ready](https://badge.waffle.io/voidberg/imagecache.png?label=ready&title=Ready)](https://waffle.io/voidberg/imagecache)
[![Latest release on NPM](https://img.shields.io/npm/v/imagecache.svg)](https://www.npmjs.com/package/imagecache)
[![Codeship Status for voidberg/imagecache](https://img.shields.io/codeship/0de31e00-4b12-0133-f672-7236a2d50232.svg)](https://codeship.com/projects/106113)
[![codecov.io](http://codecov.io/github/voidberg/imagecache/coverage.svg?branch=master)](http://codecov.io/github/voidberg/imagecache?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![David-dm.org](https://david-dm.org/voidberg/imagecache.svg)](https://david-dm.org/voidberg/imagecache#info=dependencies&view=table)
[![David-dm.org](https://david-dm.org/voidberg/imagecache/dev-status.svg)](https://david-dm.org/voidberg/imagecache#info=devDependencies&view=table)
[![MIT License](https://img.shields.io/npm/l/imagecache.svg)](https://opensource.org/licenses/MIT)

#Imagecache
---

## What is it?

Node image generation module based on CamanJS and inspired by Drupal's image styles.

## Installation

### Linux prerequisites
* `aptitude install libcairo-dev libgif-dev libjpeg-dev`

### Mac OS X prerequisites

It's quite painful, be warned.

* Install X Server (http://xquartz.macosforge.org/trac/wiki/X112.7.6).
* Install X Code (https://itunes.apple.com/gb/app/xcode/id497799835?mt=12) and command line tools.
* Install Homebrew (https://github.com/Homebrew/homebrew/wiki/Installation).
* `export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig`.
* Install Cairo from source: `brew install --build-from-source cairo`.

## Usage

```
var presets = require('./presets.js');
var ImageCache = require('imagecache');

var imagecache = new ImageCache(presets);

imagecache.render('./in.png', 'preset_one', function (err, image) {
  // Save the image
  image.save('out_s_crop_teaser.png');

  // or

  // Get a buffer, stream it etc
  image.canvas.toBuffer();
})
```

## Presets structure

```
{
  preset_one: {
    presetname: 'preset_one',
    actions: [
      {
        action: 'scale_and_crop',
        config: {
          width: 100,
          height: 300
        }
      },
      {
        action: 'define_canvas',
        config: {
          color: '#333333',
          exact: {
            width: 400,
            height: 400,
            xpos: 'center',
            ypos: 'center'
          }
        }
      }
    ]
  },
  preset_two: {
    presetname: 'preset_two',
    actions: [
      {
        action: 'scale_and_crop',
        config: {
          width: 70,
          height: 70,
        }
      }
    ]
  }
}
```

### Creating plugins
Breeze is used for plugin management. There are two types of plugins available:

* Utility plugins that add functions to be used by other plugins. For example see `plugins/_converters.js` that adds utility functions for parsing parameters that are used by all other plugins.
* Action plugins that expose one or more functions that implement actions.

For example, a plugin that implements the sharpen action will attach a sharpen function to the plugin registry. The function signature is `image, config, callback` where `image` is the `CamanJS` object, `config` is the action configuration from the preset and `callback` is the function that triggers the completion of the action.

```
var self = module.exports = {
  attach: function (options) {
    this.sharpen = function (image, config, callback) {
      var value = this.convertInt(config.value);

      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }

      image.sharpen(value);
      callback();
    };
  }
};
```

##Imagecache actions:


* Brightness [✓]
* Crop [✓]
* Define canvas [✓]
* Desaturate [✓]
* Negative image [✓]
* Resize [✓]
* Scale [✓]
* Scale and crop [✓]
* Sharpen [✓]
* Contrast [✓]
* Clip [✓]
* Colorize [✓]
* Exposure [✓]
* Gamma [✓]
* Hue [✓]
* Noise [✓]
* Saturation [✓]
* Sepia [✓]
* Vibrance [✓]
* Curves [✓]
* Overlay (watermark) [✓]
* CamanJS filters (vintage, lomo, clarity, sinCity, sunrise, crossProcess, orangePeel, love, grungy, jarques, pinhole, oldBoot, glowingSun, hazyDays, herMajesty, nostalgia, hemingway, concentrate) [✓]

Legend:

* [✓] - Implemented
* [✗] - Will not be implemented
* [] - Not implemented yet
