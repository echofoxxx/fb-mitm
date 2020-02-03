const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const request = require('request');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use((req, res, next) => {
    request({
      url: req.url,
      method: req.method,
      body: req.body,
      headers: req.headers,
    }, function (err, response, body) {
      res.send(body);
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
