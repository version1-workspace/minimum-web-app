const post = require('./posts/:id');
const posts = require('./posts');

module.exports = {
  posts: {
    show: post.handle,
    index: posts.handle,
  }
}
