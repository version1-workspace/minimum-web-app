function layout(title, content) {
  return "<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"/assets/style.css\" /><title>" + title + "</title></head><body>" + content + "</body></html>";
}

function top() {
  return layout("Top | Minimum Web App", "<h1>Top Page</h1><div class=\"content\"><a href='/posts'>Posts</a></div>");
}

function postIndex({ posts }) {
  let postElements = posts.map((post, index) => {
    return "<li class='post'><p class='index'>" + (index+1) + ".</p><div class='thumbnail'><img class='img' src='" + post.thumbnailURL + "' /></div><h2 class='title'><a href='/posts/" + post.id + "'>" + post.title + "</a></h2></li>";
  }).join("");
  postElemtns = "<ul>" + postElements + "</ul>";
  return layout("Post | Minimum Web App", "<h1>Posts Index</h1><div>" + postElements + "</div>");
}

function postShow({ post }) {
  const postDetail = "<h2>" + post.title + "</h2><p>" + post.content + "</p>";
  return layout("Post | Minimum Web App", postDetail);
}


module.exports = {
  top,
  postIndex,
  postShow
}
