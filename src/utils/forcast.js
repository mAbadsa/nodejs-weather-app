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
                    precipProbability: body.currently["precipProbability"],
                    maxTemp: body.daily.data[0].temperatureHigh,
                    minTemp: body.daily.data[0].temperatureLow,
                    timeNow: body.daily.data[0].time,
                    time2: body.daily.data[1].time,
                    time3: body.daily.data[2].time,
                });
        }
    });
}

module.exports = {
    forcast: forcast
}