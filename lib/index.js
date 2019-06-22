'use strict';

const fs = require('fs');
const path = require('path');

module.exports = () => {
  return fs.readdirSync(__dirname)
    .filter(file => path.extname(file) === '.lua')
    .map(file => {
      const longName = path.basename(file, '.lua');
      const name = longName.split('-')[0];
      const numberOfKeys = parseInt(longName.split('-')[1]);
      return {
        name,
        options: { numberOfKeys, lua: fs.readFileSync(path.join(__dirname, file)).toString() },
      };
    });
};
