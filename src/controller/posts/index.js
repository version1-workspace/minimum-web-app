const view = require('../../view');
const { Post } = require('../../model');

function handle(request, response) {
  switch (request.method) {
    case 'GET':
      index(request, response);
      return true;
  }

  return false;
}

async function index(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  const posts = await Post.findAll()
  response.end(view.postIndex({ posts }));
}

module.exports = {
  handle,
}
