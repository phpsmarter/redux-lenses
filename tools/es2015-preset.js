const buildPreset = require('babel-preset-es2015').buildPreset
const BABEL_ENV = process.env.BABEL_ENV

module.exports = {
  presets: [
    [
      'es2015',
      {
        loose: true,
        modules: BABEL_ENV === 'es' ? false : 'commonjs'
      }
    ]
  ]
}