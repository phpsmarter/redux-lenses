const config = {
  presets: ['./tools/es2015-preset.js', 'react'],
  plugins: ['transform-class-properties']
}

if (process.env === 'test') {
  config.sourceMaps = 'inline'
}

if (process.env === 'production') {
  config.plugins.concat(['transform-react-remove-prop-types'])
}

module.exports = config