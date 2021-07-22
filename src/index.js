const minimist = require('minimist');
const _ = require('lodash');
const dicts = require('./dictionaries');

module.exports = function() {
  let argv;
  if (process.argv[0] === 'node') {
    argv = minimist(process.argv.slice(2));
  } else {
    argv = minimist(process.argv.slice(1));
  }

  let names = _.keys(dicts);
  if (!argv['list-dicts']) {
    let count = argv.c || argv.count || argv.n || '1';
    count = parseInt(count, 10);  

    let from = argv.from || argv.dict || argv.category;
    names = _.times(count, () => {
      let dict = dicts[_.sample(_.keys(dicts))]
      if (from && dicts[from]) {
        dict = dicts[from];
      }
      return _.sample(dict)
    });
  }
  _.each(names, name => console.log(name));
}
