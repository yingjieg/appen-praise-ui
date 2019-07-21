const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:3000' }));
  app.use(proxy('/ws', { target: 'ws://localhost:3000', ws: true }));
}
