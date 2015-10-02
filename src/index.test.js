/* global describe, it */
import {expect} from 'chai';
import ImageCache from './index';

describe('ImageCache', function imageCacheTests() {
  it('loads all plugins', function loadsAllPluginsTest() {
    const presets = {};
    const expectedPlugins = [
      '_converters',
      'brightness',
      'clip',
      'colorize',
      'contrast',
      'crop',
      'curves',
      'define_canvas',
      'desaturate',
      'exposure',
      'file',
      'filter',
      'gamma',
      'hue',
      'negative',
      'noise',
      'resize',
      'saturation',
      'scale',
      'scale_and_crop',
      'sepia',
      'sharpen',
      'vibrance',
    ];

    const imagecache = new ImageCache(presets);
    const plugins = imagecache.plugins();

    expect(plugins).to.eql(expectedPlugins);
  });

  it('loads presets', function loadsPresetsTest() {
    const expectedPresets = {
      s_crop_small: {
        presetname: 's_crop_small',
        actions: [
          {
            action: 'scale_and_crop',
            config: {
              width: 70,
              height: 70,
            },
          },
        ],
      },
      s_crop_teaser: {
        presetname: 's_crop_teaser',
        actions: [
          {
            action: 'scale_and_crop',
            config: {
              width: 152,
              height: 152,
            },
          },
        ],
      },
    };

    const imagecache = new ImageCache(expectedPresets);
    const presets = imagecache.presets();

    expect(presets).to.eql(['s_crop_small', 's_crop_teaser']);
  });

  it('fails when using an undefined preset', function failsUndefinedPresetTest() {
    const presets = {};
    const imagecache = new ImageCache(presets);

    imagecache.render('foo.png', 'foo_bar', function renderCallback(err) {
      expect(err).to.exist
        .and.be.instanceof(Error)
        .and.have.property('message', 'Preset foo_bar could not be found.');
    });
  });
});
