const webpack = require('webpack');

// Load .env file for local development
require('dotenv').config();

// Pass all environment variables
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ]
};
