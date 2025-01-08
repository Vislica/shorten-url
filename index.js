const express = require('express');
const shortenRouter = require('./shortenRouter');
const client = require('./dataBaseClient');

const app = express();

const PORT = process.env.PORT || 5000;


app
    .use(express.json())
    .use('/shorten', shortenRouter);

const start = () => {
    client.connect().then(() => {
        app.listen(
            PORT,
            () => {
                console.log('server start on %d port', PORT);
            }
        )
    }).catch((e) => {
        console.log(e)
    })
};

start()
