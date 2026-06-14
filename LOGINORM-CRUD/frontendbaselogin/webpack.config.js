const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    cache: false,
    entry: "./src/Application.jsx",
    output: {
        path: path.resolve(__dirname, '../backendbaselogin/public'),
        filename: "main.js",
        clean: {
            // Protege la subcarpeta 'imagenes' dentro de 'public' del borrado automático de Webpack
            keep: /imagenes\//
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './plantilla/index.html',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../backendbaselogin/public')
        },
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
        // Proxy inverso: enruta las peticiones de React hacia la API de Express
        proxy: [
            {
                context: ['/Login', '/Productos', '/Productos'],
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true
            }
        ]
    }
};
