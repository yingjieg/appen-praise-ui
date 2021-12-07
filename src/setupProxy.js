const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:3000' }));
  app.use(createProxyMiddleware('/ws', { target: 'ws://localhost:3000', ws: true }));
}
