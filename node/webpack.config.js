module.exports = function (env) {
    const jsConfig = require(`./webpack.js.${env}.config`);
    const cssConfig = require(`./webpack.css.${env}.config`);
    return [jsConfig.jsConfig, cssConfig.cssConfig];
}