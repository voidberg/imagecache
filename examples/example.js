var presets = require('./presets.js');
var ImageCache = require('../dist/index');

var imagecache = new ImageCache(presets);

imagecache.render('./in.png', 'test_sc', function (err, image) {
  console.log('Saving');
  image.save('out_test_sc.png');
})

imagecache.render('./in.png', 's_crop_teaser', function (err, image) {
  image.save('out_s_crop_teaser.png');
})

imagecache.render('./in.png', 's_crop_tiny', function (err, image) {
  image.save('out_s_crop_tiny.png');
})

imagecache.render('./in.png', 's_scale_teaser', function (err, image) {
  image.save('out_s_scale_teaser.png');
})
