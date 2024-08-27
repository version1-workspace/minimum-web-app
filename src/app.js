const http = require('http');
const route = require('./router');
const controller = require('./controller');
const api = require('./controller/api/v1');

function run() {
  const handlers = route.routing([
    // html
    {
      path: '/',
      handler: controller.home
    },
    {
      path: '/posts',
      handler: controller.posts.index
    },
    {
      path: '/posts/:id',
      handler: controller.posts.show
    },
    {
      path: '/assets/style.css',
      handler: controller.style
    },
    {
      path: '/media/.+',
      handler: controller.media
    },
    // api
    {
      path: '/api/v1/posts',
      handler: api.posts.index
    },
    {
      path: '/api/v1/posts/:id',
      handler: api.posts.show
    },
  ])

  const server = http.createServer(handlers);
  const port = 8080
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  server.on('request', (request, response) => {
    console.log(new Date(), request.method, request.url);
  });
}


module.exports = {
  run
}
