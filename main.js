const http = require('node:http');

const foo = async () => {
// Create a local server to receive data from
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: 'Hello OKTEN!',
        }));
    });

    server.listen(8000);
}

void foo();
