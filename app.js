const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./api/routes/books');
const authorRoutes = require('./api/routes/authors');

mongoose.connect("mongodb://mongo-username:mongo-pass@node-mongo-rest-shard-00-00-vhyfq.mongodb.net:27017,node-mongo-rest-shard-00-01-vhyfq.mongodb.net:27017,node-mongo-rest-shard-00-02-vhyfq.mongodb.net:27017/test?ssl=true&replicaSet=node-mongo-rest-shard-0&authSource=admin&retryWrites=true",
    {
        useMongoClient: true
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
