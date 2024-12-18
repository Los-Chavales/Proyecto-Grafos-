var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var housesRouter = require('./routes/houses_routes');
var usersRouter = require('./routes/users_routes');
var placesRouter = require('./routes/places_routes');
var routesRouter = require('./routes/routes_routes');

var app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/houses', housesRouter);
app.use('/users', usersRouter);
app.use('/places', placesRouter);
app.use('/routes', routesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin:*'); // Allow all origins
  res.header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE'); // Allow specific HTTP methods
  res.header('Acess-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


module.exports = app;
