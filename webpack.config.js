const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let os = require('os');
let ifaces = os.networkInterfaces();
let host;
for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
        if (details.family == 'IPv4' && details.address.indexOf('127') == -1) {
            return host = details.address
        }
    });
}

module.exports = {
    "mode": "development",
    // "mode": "production",
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        host: host,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', filename: "index.html" })
    ]
}