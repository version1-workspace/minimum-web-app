const path = require('node:path');
const { readFile, stat } = require('node:fs/promises');

function handle(request, response) {
  switch (request.method) {
    case 'GET':
      index(request, response);
      return true;
  }

  return false;
}

async function index(request, response) {
  const requestPath = request.url.replaceAll('/media', '');
  if (requestPath.includes('../')) {
    response.writeHead(400, {'Content-Type': 'application/json'});
    response.end({ message: 'relative path notation is not allowed' });
    return
  }

  try {
    const filePath = `./public${requestPath}`
    const f = stat(filePath);
    if (!f) {
      console.error("[ERROR]", `${filePath} not found`);
      response.writeHead(404, {'Content-Type': '/plain'});
      response.end({ message: 'Not Found' });
      return
    }

    const file = await readFile(filePath)
    const extname = filePath.split('.').pop();
    response.writeHead(200, {'Content-Type': `image/${extname}`});
    response.end(file);
  } catch (error) {
    console.error("[ERROR]", error);
    response.writeHead(404, {'Content-Type': '/plain'});
    response.end({ message: 'Not Found' });
  }
}

module.exports = {
  handle,
}
