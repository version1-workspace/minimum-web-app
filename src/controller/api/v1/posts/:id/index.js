const { Post } = require('../../../../../model');

function handle(request, response) {
  switch (request.method) {
    case 'GET':
      show(request, response);
      return true;
    case 'PATCH':
      update(request, response);
      return true;
    case 'DELETE':
      destroy(request, response);
      return true;
  }

  return false;
}

async function show(request, response) {
  const { id } = request.params;
  response.writeHead(200, {'Content-Type': 'application/json'});
  const post = await Post.find(id)

  response.end({ data: post.json });
}

async function update(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  const post = await Post.find(id)
  Object.assign(post, request.body)
  await post.save()

  response.end("<html><head><title>Top | Minimum Web App</title></head><body><h1>Top Page</h1></body></html>");
}

async function destroy(request, response) {
  const { id } = request.params;
  response.writeHead(200, {'Content-Type': 'application/json'});
  const post = await Post.find(id)
  await post.delete()

  response.end({ data: post });
}

module.exports = {
  handle,
}
