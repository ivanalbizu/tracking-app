const cors = require('cors');

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8081
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { auth } = require('./helpers/auth');
const ioServer = require('socket.io');

const unless = (middleware, ...paths) => {
  return (req, res, next) => {
    const pathCheck = paths.some(path => path === req.path)
    pathCheck ? next() : middleware(req, res, next)
  }
}

//app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({
  limit: '10mb',
  extended: true
}))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api', require('./routes/index'));

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const history = require('connect-history-api-fallback');
app.use(history());

app.use(express.static(path.join(__dirname + '/public')))
app.use(unless(auth, "/signin"))

const server = app.listen(port, () => console.log(`Listening on ${port}`))

const io = new ioServer(server)

require('./modules/socket')(io)