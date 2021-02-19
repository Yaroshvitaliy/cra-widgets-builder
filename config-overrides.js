const { library } = require('./package.json');

module.exports = function(config, env) {
  // const isEnvDevelopment = env === 'development';
  //const isEnvProduction = env === 'production';

  config.output.library = library;
  config.output.libraryTarget = 'umd';
  config.output.libraryExport = 'default';

  return config;
};