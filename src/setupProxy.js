const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function addProxyMiddleware(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://xgain.iccs.gr:8000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api from the URL path
            },
        })
    );
    app.use(
        '/api3',
        createProxyMiddleware({
            target: 'http://localhost:5122',
            changeOrigin: true,
            pathRewrite: {
                '^/api3': '', // remove /api from the URL path
            },
        })
    );
    app.use(
        '/api1',
        createProxyMiddleware({
            target: 'https://xgain.incites.eu',
            changeOrigin: true,
            pathRewrite: {
                '^/api1': '', // remove /api1 from the URL
            },
        })
    );
};