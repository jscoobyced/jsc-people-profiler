const del = require('delete');

var rootPath = __dirname;

function CleanupPlugin(options) {
    rootPath = options.rootPath;
}

CleanupPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compile', function () {
        console.log('Starting cleanup.');
        var jscFile = rootPath + '/js/jsc-*.js';
        var manifestFile = rootPath + '/js/manifest-*.js';
        var vendorFile = rootPath + '/js/vendor-*.js';
        var cssFiles = rootPath + '/css/*.css';
        var woffFiles = rootPath + '/css/*.woff';
        var woff2Files = rootPath + '/css/*.woff2';
        var svgFiles = rootPath + '/css/*.svg';
        var eotFiles = rootPath + '/css/*.eot';
        var ttfFiles = rootPath + '/css/*.ttf';

        del.sync([jscFile, manifestFile, vendorFile, cssFiles, woffFiles, woff2Files, svgFiles, eotFiles, ttfFiles], {
            force: true
        });

        console.log('Cleanup complete.');
    });
};

module.exports = CleanupPlugin;