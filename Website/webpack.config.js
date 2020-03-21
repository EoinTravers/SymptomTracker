const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: {
        'core': './src/core.js',
        'app' : './src/app.js',
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // Python script to join html fragments (src/html/*) into single file (dist/index.html)
        new WebpackShellPlugin({onBuildStart:['python ./build/html.py']})
    ],
};
