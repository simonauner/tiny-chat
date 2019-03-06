import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
let server;

app.disable('x-powered-by');
// app.use(compression());
app.use(express.static(path.resolve(__dirname, '../src')));

export function startServer(callback) {
    const port = 8080;
    server = app.listen(port, 'localhost', () => {
        console.log(
            `Server is now listening at http://${server.address().address}:${
                server.address().port
            }`
        );
    });
}

export function stopServer(callback) {
    server.close(callback);
}
