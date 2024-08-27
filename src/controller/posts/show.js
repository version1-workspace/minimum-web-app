const view = require('../../view');
const { Post } = require('../../model');

function handle(request, response) {
  switch (request.method) {
    case 'GET':
      show(request, response);
      return true;
  }

  return false;
}

async function show(request, response) {
  const { id } = request.params;
  response.writeHead(200, {'Content-Type': 'text/html'});

  const post = await Post.find(id)
  response.end(view.postShow({ post }));
}

module.exports = {
  handle,
}
