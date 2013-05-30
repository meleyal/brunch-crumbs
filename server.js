var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000;

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(port);
