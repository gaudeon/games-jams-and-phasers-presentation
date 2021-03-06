const path = require('path');
const webpack = require('webpack');

// Phaser webpack config
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const config = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        app: ['../src/app.js'],
        vendor: ['reveal', 'lodash', 'pixi', 'p2', 'phaser', 'webfontloader']
    },
    output: {
        filename: '[name].bundle.js',
        pathinfo: true,
        path: path.resolve(__dirname, '../dist/assets/'),
        publicPath: '/assets/'
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../src'),
        watchContentBase: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            },
            {
                test: /pixi\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'PIXI'
                }]
            },
            {
                test: /phaser-split\.js$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser'
                }]
            },
            {
                test: /p2\.js/,
                use: [{
                    loader: 'expose-loader',
                    options: 'p2'
                }]
            },
            {
                test: require.resolve('reveal'),
                use: [{
                    loader: 'expose-loader',
                    options: 'Reveal'
                }]
            },
            {
                test: /src\/.*\.(html)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../'
                    }
                }]
            },
            {
                test: /node_modules\/.*\.(css)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /assets\/.*\.(css|CSS|jpe?g|JPE?G|gif|GIF|png|PNG|svg|SVG|woff|WOFF|ttf|TTF|wav|WAV|mp3|MP3|html|HTML)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'Phaser': phaser,
            'pixi': pixi,
            'PIXI': pixi,
            'p2': p2
        }
    }
};

module.exports = config;
