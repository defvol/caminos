'use strict';

var argv    = require('minimist')(process.argv.slice(2)),
    bbox    = JSON.parse(argv.bbox ? argv.bbox : '[-180, -85, 180, 85]'),
    length  = 0,
    path    = require('path'),
    source  = argv._[0] || 'latest.planet.mbtiles',
    tileReduce = require('tile-reduce'),
    zoom    = argv.zoom ? parseInt(argv.zoom) : 12;

function usage() {
  console.log('Usage: node index.js --<options> <tileset>');
  console.log('node index.js --bbox="[-115, 28, -105, 32]" --zoom=12 tiles');
  process.exit(1);
}

if(argv.help) usage();

tileReduce({
  bbox: bbox,
  zoom: zoom,
  map: path.join(__dirname, '/map.js'),
  sources: [
    {
      name: 'inegi',
      mbtiles: path.join(__dirname, source),
      layers: ['Red_Vial']
    }
  ]
})
.on('reduce', function(result) {
  length += result;
})
.on('end', function(error) {
  console.log("Found " + length + " KM");
});

