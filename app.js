//In APP.JS andiamo ad importare il pacchetto yargs e la funzione get presa dal file get.js nella cartella cmd:
const yargs = require('yargs');
const get = require('./cmd/get.js');
const add = require('./cmd/add.js');
const del = require('./cmd/del.js');
const read = require('./cmd/read.js')

//Avendo importato la funzione get possiamo invocarla, passandogli come parametro reale (yargs)
get(yargs);
add(yargs);
del(yargs);
read(yargs);


//Trasformo yargs in codice JS
yargs.parse();