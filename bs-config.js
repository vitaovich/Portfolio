var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    server: {
        baseDir: './out',
        routes: {
          "/node_modules": "node_modules"
        },
        middleware: {
            1: fallbackMiddleware({
                index: './index.html', verbose: true
            }),

            2: proxyMiddleware('/api', {
                target: 'http://localhost:3001',
                changeOrigin: true,   // for vhosted sites, changes host header to match to target's host
                router: {
                    // when request.headers.host == 'dev.localhost:3000',
                    // override target 'http://www.example.org' to 'http://localhost:8000'
                    'localhost:3001' : 'http://localhost:8000'
                }
            })

        }
    }
};
