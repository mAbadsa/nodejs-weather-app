const request = require("request");
const axios = require("axios");

// const forcast = (latitude, longitude, callback) => {
//     const url = `https://api.darksky.net/forecast/8c1d2449603db176448f6f08ad4d05dc/${latitude},${longitude}?units=si&lang=ar`;
//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback(' ❗ Unable to connect to weather service!', undefined);
//         } else if (body.error) {
//             callback(' ❗ Unalbe to find location', undefined);
//         } else {
//             callback(undefined,
//                 {
//                     summary: body.daily.data[0].summary,
//                     temperature: body.currently["temperature"],
//                     precipProbability: body.currently["precipProbability"],
//                     maxTemp: body.daily.data[0].temperatureMax,
//                     minTemp: body.daily.data[0].temperatureMin,
//                     timeNow: body.daily.data[0].time,
//                     time2: body.daily.data[1].time,
//                     time3: body.daily.data[2].time,
//                     latitude: body.latitude,
//                     longitude: body.longitude,
//                 });
//         }
//     });
// }

// https://api.darksky.net/forecast/8c1d2449603db176448f6f08ad4d05dc/34.4002219822707,31.4002219822707?units=si&lang=ar

const forcast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8c1d2449603db176448f6f08ad4d05dc/${latitude},${longitude}?units=si&lang=ar`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(" ❗ Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(" ❗ Unalbe to find location", undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently["temperature"],
        precipProbability: body.currently["precipProbability"],
        maxTemp: body.daily.data[0].temperatureMax,
        minTemp: body.daily.data[0].temperatureMin,
        timeNow: body.currently.time,
        latitude: body.latitude,
        longitude: body.longitude,
        precipProbability: body.currently.precipProbability,
        humidity: body.currently.humidity,
        icon: body.currently.icon,
        windSpeed:
          Math.round((body.currently.windSpeed * 3600) / 1000) + " km/h",
        daily: body.daily.data,
      });
    }
  });
};

module.exports = {
  forcast: forcast,
};
