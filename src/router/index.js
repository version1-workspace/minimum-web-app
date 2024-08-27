function match(path, target) {
  const targetList = target.split('/');
  const list = path.split('/');
  let params = {};

  for (let i = 0; i < list.length; i++) {
    let regexp = list[i];
    const ele = list[i];
    const key = ele.substring(1);
    if (ele.startsWith(':')) {
      regexp = `(?<${key}>.+)`;
    }

    const r = targetList[i]?.match(new RegExp(regexp));
    if (!r) {
      return {
        match: false,
      }
    }

    if (r.groups) {
      params[key] = r.groups[key];
    }
  }

  return {
    match: true,
    params
  }
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (data) => {
      body += data;
    });

    const contentType = request.headers['Content-Type']
    request.on('end', () => {
      if (contentType === 'application/json') {
        request.body = JSON.parse(body);
      }

      resolve();
    });
  });
}

function routing (handlers) {
  return async function (request, response) {
    handlers.sort((a, b) => {
      return b.path.length - a.path.length;
    })

    for (let i = 0; i < handlers.length; i++) {
      const { path, handler } = handlers[i];
      const res = match(path, request.url);
      if (res.match) {
        await parseBody(request);
        request.params = res.params;

        try {
          const matched = handler(request, response);
          if (!matched) {
            continue;
          }
        } catch (e) {
          console.error('got unexpected error');
          console.error(e);
          response.writeHead(500, {'Content-Type': 'application/json'});
          response.end(JSON.stringify({ message: 'Internal Server Error' }));
        }

        return;
      }
    }

    response.writeHead(404, {'Content-Type': 'application/json'});
    response.end(JSON.stringify({ message: 'Not Found' }));
  }
}

module.exports = {
  routing
}
