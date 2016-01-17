var turf = require('turf');

module.exports = function(data, tile, writeData, done) {
  var length      = 0,
      inegiLayer  = data.inegi.Red_Vial;

  inegiLayer.features.forEach(function(element, index) {
    length += turf.lineDistance(element, 'kilometers');
  });

  done(null, length);
};

