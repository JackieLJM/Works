var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=latest&presets[]=react'},
            {test: /\.(png|jpg)$/, exclude: /node_modules/, loader: 'url?limit=10000'}
        ]

    }
    // plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.UglifyJsPlugin()
    // ]

}