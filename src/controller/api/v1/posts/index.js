const { Post } = require('../../../../model');
function handle(request, response) {
  switch (request.method) {
    case 'GET':
      index(request, response);
      return true;
    case 'POST':
      create(request, response);
      return true;
  }

  return false;
}

async function index(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  const posts = await Post.findAll()

  response.end(JSON.stringify({ data: posts.map(post => post.json )}));
}

async function create(request, response) {
  response.writeHead(201, {'Content-Type': 'application/json'});
  const post = new Post(request.body)
  await post.save()

  response.end({ data: {} });
}

module.exports = {
  handle,
}
