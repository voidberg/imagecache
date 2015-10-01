module.exports = {
  test_sc: {
    presetname: 'test_sc',
    actions: [
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
  s_crop_small: {
    presetname: 's_crop_small',
    actions: [
      {
        action: 'scale_and_crop',
        config: {
          width: 70,
          height: 70,
        }
      }
    ]
  },
  s_crop_teaser: {
    presetname: 's_crop_teaser',
    actions: [
      {
        action: 'scale_and_crop',
        config: {
          width: 152,
          height: 152,
        }
      }
    ]
  },
  s_crop_tiny: {
    presetname: 's_crop_tiny',
    actions: [
      {
        action: 'scale_and_crop',
        config: {
          width: 32,
          height: 32,
        }
      }
    ]
  },
  s_scale_teaser: {
    presetname: 's_scale_teaser',
    actions: [
      {
        action: 'file',
        config: {
          xpos: 'center',
          ypos: 'center',
          alpha: 20,
          path: 'watermark.png'
        }
      },
      {
        action: 'scale',
        config: {
          width: 340,
          height: 340,
          upscale: 0
        }
      }
    ]
  }
};
