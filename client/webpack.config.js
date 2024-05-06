const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// Require the GenerateSW class of the WorkBoxPlugin 
const WorkboxPlugin = require('workbox-webpack-plugin');

// Done: Add and configure workbox plugins for a service worker and manifest file.
// Done: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE text eidtor',
        short_name: 'Jate',
        description: 'Just another PWA JS text editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
          // {
          //   src: path.resolve('src/assets/large-icon.png'),
          //   size: '1024x1024' // you can also use the specifications pattern
          // },
          // {
          //   src: path.resolve('src/assets/maskable-icon.png'),
          //   size: '1024x1024',
          //   purpose: 'maskable'
          // }
        ]
      }),
      new MiniCssExtractPlugin(),
      //new WorkboxPlugin.GenerateSW()
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          //use: [MiniCssExtractPlugin.loader, 'css-loader'],
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
