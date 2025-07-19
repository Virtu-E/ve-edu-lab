const path = require('path')

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@features': path.resolve(__dirname, 'src/features'),
        '@core': path.resolve(__dirname, 'src/core'),
        '@app': path.resolve(__dirname, 'src/app'),
    }
    return config
}
