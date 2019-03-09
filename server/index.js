import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
let server;

app.disable('x-powered-by');

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => {
    res.send(' ');
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

export function startServer(callback) {
    const port = 8080;
    server = app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(
            `Server is now listening at http://${server.address().address}:${
                server.address().port
            }`
        );
    });

    if (typeof callback === 'function') {
        callback();
    }
}

export function stopServer(callback) {
    server.close(callback);
}
