const db1 = require(`./models/database1.js`);
// const db2 = require(`./models/database2.js`);
// const db3 = require(`./models/database2.js`);
var dotenv = require('dotenv').config();
var express = require('express');
const hbs = require(`hbs`);
const routes = require(`./routes/routes.js`);
var app = express();
const bodyparser = require('body-parser');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(`public`));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

// port number
const port = process.env.PORT || 3000;
// hostname = "localhost" || process.env.HOSTNAME;

app.use(`/`, routes);


app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + "localhost" + `:` + port);
});