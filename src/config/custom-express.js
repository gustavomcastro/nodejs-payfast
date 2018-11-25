const express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
module.exports = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(expressValidator());

    consign().include('src/routes')
    .then('src/connection')
    .then('src/dao').into(app);
    return app;
};