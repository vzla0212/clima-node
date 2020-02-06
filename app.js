const lugar = require('./lugar/lugar')
const clima = require('./clima/clima')
const colors = require('colors');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion para obtener el clima',
        demand: true
    }
}).argv;


const getInfo = async(dir) => {

    const citydata = await lugar.getLugarLatLong(dir)
        .then(resp => { return resp })
        .catch(new Error('No data for coordenates'));
    const tiempo = await clima.getClima(citydata.lat, citydata.lng)
        .then(resp => { return resp })
        .catch(new Error('No Weather info for city'));

    return `el clima para la ciudad ${dir} con coordenadas` + ` (${citydata.lat},${citydata.lng}) `.red + 'y temp ' + `${tiempo}`.blue
}

getInfo(argv.direccion).then(console.log).catch(err => console.log('ERROR: ', err))

/*
const citydata = lugar.getLugarLatLong(argv.direccion)
    .then(console.log);

console.log("citydata", citydata.red);
clima.getClima(citydata.lat, citydata.lng).then(console.log).catch(err => console.log('Error!!!!', err))
*/