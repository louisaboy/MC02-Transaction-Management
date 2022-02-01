const express = require(`express`);
const dotenv = require(`dotenv`);
var bodyparser = require('body-parser');
const hbs = require(`hbs`);
const routes = require(`./routes/routes.js`);
const db = require(`./models/db.js`);
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

dotenv.config();

port = 3000 || process.env.PORT;
hostname = "localhost" || process.env.HOSTNAME;

app.use(express.static(`public`));
app.use(fileUpload());
app.use(`/`, routes);

db.connect();

app.listen(port, hostname, function () {
    console.log(`Server is running at:`);
    console.log(`http://` + hostname + `:` + port);
});
