const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/8c1d2449603db176448f6f08ad4d05dc/${latitude},${longitude}?units=si&lang=ar`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(' ❗ Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(' ❗ Unalbe to find location', undefined);
        } else {
            callback(undefined,
                {
                    summary: body.daily.data[0].summary,
                    temperature: body.currently["temperature"],
                    precipProbability: body.currently["precipProbability"]
                });
        }
    });
}

module.exports = {
    forcast: forcast
}