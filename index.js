var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

const client = new MongoClient('mongodb://'+ process.env.MONGO_USER +':'+ process.env.MONGO_PASS +'@'+ process.env.MONGO_HOST +'/'+ process.env.MONGO_DB +'?authSource=admin');

app.get('/', function (req, res) {
  client.connect(function(err) {
    if (err) return res.send(err);
    client.db(process.env.MONGO_DB).stats(function (err, stats) {
      if (err) return res.send(err);
      res.json(stats);
    });
});
  
});

app.listen(process.env.PORT || 8080, function () {
  console.log('nodejs_mongodb_example listening on port:' + (process.env.PORT || 8080));
});