// const request = require('request');
const axios = require("axios");

// https://api.mapbox.com/geocoding/v5/mapbox.places/gaza.json?access_token=pk.eyJ1IjoibWFiYWRzYSIsImEiOiJjangxb3dobzQwYzNuNDhscHRvMmlremEyIn0._AXLzA5T0av5qhqN57bRxA

// const geocode = (address, callback) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFiYWRzYSIsImEiOiJjangxb3dobzQwYzNuNDhscHRvMmlremEyIn0._AXLzA5T0av5qhqN57bRxA&limit=1`;
//     request({url, json: true}, (error, { body }) => {
//         console.log(body);
//         if(error) {
//             callback(' ❗ Unable to connect to location service!', undefined);
//         } else if (body.features.length === 0) {
//             callback(' ❗ Unalbe to find location. Try another search!', undefined);
//         } else {
//             callback(undefined, {
//                 latitude: body.features[0].center[0],
//                 longitude: body.features[0].center[1],
//                 location: body.features[0].place_name,
//             });
//         }
//     });
// }

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFiYWRzYSIsImEiOiJjangxb3dobzQwYzNuNDhscHRvMmlremEyIn0._AXLzA5T0av5qhqN57bRxA`;
  axios
    .get(url)
    .then((res) => {
      return res;
    })
    .then(({ data }) => {
      // console.log(data);
      if (data.features.length === 0) {
        console.log("ERROR");
        callback(" ❗ Unalbe to find location. Try another search!", undefined);
        return;
      }
      // callback(undefined, {
      //   longitude: data.features[0].center[0],
      //   latitude: data.features[0].center[1],
      //   countryName: data.features[0].place_name.split(', ').splice(-1)[0],
      //   placeName: data.features[0].text
      // });
      console.log(data.features);
      callback(undefined, {
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1],
        countryName: data.features[0].place_name.split(", ").splice(-1)[0],
        placeName: data.features[0].text,
        features: data.features,
      });
    })
    .catch((err) => {
      if (err) {
        callback(" ❗ Unable to connect to location service!", undefined);
      }
    });
};

module.exports = {
  geocode: geocode,
};
