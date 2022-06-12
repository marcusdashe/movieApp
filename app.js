const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const winston = require("./config/winstonConfig")
const db = require('./config/db')

const app = express();

//database
db()

// Use React as Template Engine
// app.set("views", path.join(__dirname, "views"))
// app.set("view engine", "jsx")
// app.engine('jsx', require('express-react-views').createEngine());

app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false}));

app.use(cookieParser());

//parse a request of content type: application/json
app.use(bodyParser.json());

app.use(morgan('combined', { stream: winston.stream }));

var corsOptions = {origin: process.env.LOCALHOST};
app.use(cors(corsOptions))

//register schema
// require('./models/user');
// require('./model/passwordReset');
// require('./model/rewardModels');

app.use('/api/user',  require("./routes/end-points"));

app.use(function(req, res, next){
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500)
    
});


module.exports = app;
