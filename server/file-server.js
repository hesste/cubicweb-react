'use strict';

var fsPath = require('path'),
    fs = require('fs');

var publicPath = fsPath.join(__dirname, '..', 'public');

var mimetypes = {
    '.js': 'application/javascript',
    '.txt': 'text/plain'
};

function servePublicFile(relativePath, httpRes) {
    var path = fsPath.join(publicPath, relativePath);

    fs.exists(path, function(ok) {
        if (ok) {
            var ext = fsPath.extname(path);
            if (ext in mimetypes) {
                httpRes.setHeader('Content-Type', mimetypes[ext]);
            }
            var stream = fs.createReadStream(path);
            stream.pipe(httpRes);
        } else {
            var body = 'not found';
            httpRes.writeHead(404, {
                'Content-Length': body.length,
                'Content-Type': 'text/plain'
            });
            httpRes.end(body);
        }
    });
}

module.exports = servePublicFile;
