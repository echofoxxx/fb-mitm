const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const request = require('request');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    const q = req.query.q;

    request({
      url: q,
      method: req.method,
      body: req.body,
      headers: {
        'User-Agent': req.header('User-Agent'),
      }
    }, function (err, response, body) {
      res.send(body);
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
