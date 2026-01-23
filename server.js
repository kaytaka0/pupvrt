import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const SITES_DIR = 'samplesites';

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, SITES_DIR, req.url);

    // If the path is a directory, redirect to the URL with a trailing slash.
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
        if (!req.url.endsWith('/')) {
            res.writeHead(301, { 'Location': req.url + '/' });
            res.end();
            return;
        }
        // If it is a directory, serve the index.html file.
        filePath = path.join(filePath, 'index.html');
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, SITES_DIR, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('You can access the sites at:');
    for (let i = 1; i <= 5; i++) {
        console.log(`http://localhost:${PORT}/site${i}/`);
    }
});
