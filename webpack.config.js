module.exports = {
    module: {
        rules: [
            {
                test:/.vue$/,
                use:'vue-loader',
            }
        ]
    },
    watchOptions: {
      poll: true
    }
}

