module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    config.externals = {
       ...config.externals,
      'axios': 'axios',
    }
  }
}

