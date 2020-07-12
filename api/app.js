const cors = require('cors');

const express = require('express');
const path = require('path');
const app = express();
const port = 8081 || process.env.PORT
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

app.use(morgan('tiny'));
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
const history = require('connect-history-api-fallback');
app.use(history());

app.use(express.static(path.join(__dirname + '/public')))
//app.use(unless(auth, "/signin"))

const server = app.listen(port, () => console.log("Listening .."))

const io = new ioServer(server)


io.on('connection', (socket) => {
  console.log('Conectado :>> ', socket.id);
  socket.on('disconnect', () => {
    console.log('Desconectado :>> ', socket.id);
  });

});

