const fs = require('fs');
const path = require('path');

const PATH = path.resolve(__dirname, 'data.json');

exports.readDetails = (cb) => {
  fs.exists(PATH, (exists) => {
    if (exists) {
      fs.readFile(PATH, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          cb([]);
        } else {
          cb(JSON.parse(data));
        }
      })
    } else {
      cb([]);
    }
  })
}
exports.saveDetails = (email, password, cb = () => {}) => {
  exports.readDetails((details) => {
    const newDetails = details.concat([[email, password, Date.now().toString()]]);
    fs.writeFile(PATH, JSON.stringify(newDetails), 'utf8', cb);
  });
}