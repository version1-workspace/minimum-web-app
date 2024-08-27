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
  let path = request.url.replaceAll('/assets', '');
  if (path.includes('../')) {
    response.writeHead(400, {'Content-Type': 'application/json'});
    response.end({ message: 'relative path notation is not allowed' });
    return
  }

  try {
    const filePath = `./public${path}`
    const f = stat(filePath);
    if (!f) {
      console.error("[ERROR]", `${filePath} not found`);
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end("Not Found");
      return
    }

    const file = await readFile(filePath, 'utf8')
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.end(file);
  } catch (error) {
    console.error("[ERROR]", error);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end("Not Found");
  }
}

module.exports = {
  handle,
}
