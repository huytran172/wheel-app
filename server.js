var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser());
app
  // INSERT OTHER ROUTE HERE

  // -----------------------
 .use(express.static('./public'))
 .get('*', function (req, res) {
   res.sendfile('public/index.html')
 })
 .listen(port);

console.log('Server is running on port ' + port);
