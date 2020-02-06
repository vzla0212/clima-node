const axios = require('axios');

const getLugarLatLong = async(direccion) => {

    const encodeURL = encodeURI(direccion)

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        headers: { 'X-RapidAPI-Key': 'e25de839femsh6fca8df554e9f20p1f019fjsn99a657f769a6' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para la búsqueda ${direccion}`)
    }

    const data = resp.data.Results[0];
    const dir = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        dir,
        lat,
        lng
    }

}

module.exports = { getLugarLatLong }