var express = require('express');
var models = require('./models');
var cors = require('cors');
var app = express();

app.options('*', cors());
app.use(cors());

var BoardController= require('./routes/BoardController');
app.use('/boards', BoardController);

models.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log('App listening on port 8080!');
  });
});
