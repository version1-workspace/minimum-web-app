const view = require('../view');
const post = require('./posts/show');
const posts = require('./posts');
const style = require('./style');
const media = require('./media');

function handle(request, response) {
  switch (request.method) {
    case 'GET':
      index(request, response);
      return true;
  }
  return false;
}

function index(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(view.top());
}

module.exports = {
  home: handle,
  posts: {
    show: post.handle,
    index: posts.handle,
  },
  style: style.handle,
  media: media.handle,
}
