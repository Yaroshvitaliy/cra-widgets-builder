const { library, version } = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fileName = `${library}-${version}`;

const createPluginsFilter = pluginsToRemove => plugin => !pluginsToRemove.includes(plugin.constructor.name);

const rewire = config => {
    config.output = {
        ...config.output,
        library,
        libraryTarget: 'umd',
        libraryExport: 'default'
    };

    config.optimization = {
        ...config.optimization,
        splitChunks: {
            cacheGroups: {
                default: false
            }
        },
        runtimeChunk: false
    };

    return config;
};

const rewireForProductionEnv = config => {
    config.output = {
        ...config.output,
        filename: `static/js/${fileName}.js`,
    };

    config.plugins = config.plugins.filter(createPluginsFilter(['MiniCssExtractPlugin']));

    config.plugins.push(new MiniCssExtractPlugin({
        filename: `static/css/${fileName}.css`,
        chunkFilename: 'static/css/[name].chunk.css'
    }));

    return config;
};

module.exports = (config, env) => {
    rewire(config);
    (env === 'production') && rewireForProductionEnv(config);
    return config;
};