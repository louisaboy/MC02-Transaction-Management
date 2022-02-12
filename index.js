
const db = require(`./models/database.js`);
var dotenv = require('dotenv').config();
var express = require('express');
var app = express();

app.use(express.json());

// app.set(`view engine`, `hbs`);
// hbs.registerPartials(__dirname + `/views/partials`);

const port = process.env.PORT || 3000;
// hostname = "localhost" || process.env.HOSTNAME;

app.use(express.static(`public`));
// // app.use(`/`, routes);

// // db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + "localhost" + `:` + port);
});
