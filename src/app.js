const express = require('express');
const https = require('https');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;
//Defined path for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partial');

//Setup handlebars engine and veiws location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        namePage: 'Home',
        title: 'Weather App',
        auther: 'Dev. by Muhammad Elabadsa'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        namePage: 'About',
        title: 'Weather App',
        auther: 'Muhammad Elabadsa'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        namePage: 'Help',
        title: 'Weather App',
        auther: 'Muhammad Elabadsa'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        urlErr: req.url,
        erroMessage: 'Help artical not found!',
        auther: 'Muhammad Elabadsa'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address term!'
        });
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        } //else {
            forcast.forcast(latitude, longitude, (error, forcastData) => {
                if(error) {
                    return res.send({error});
                } else {
                    res.send({
                        summary: forcastData.summary,
                        temperature: forcastData.temperature,
                        precipProbability: forcastData.precipProbability,
                        maxTemp: forcastData.maxTemp,
                        minTemp: forcastData.minTemp,
                        location: location,
                        timeNow: forcastData.timeNow,
                        time2: forcastData.time2,
                        time3: forcastData.time3
                    });
                } 
            });
        //} 
    });
});



app.get('/*', (req, res) => {
    res.render('404', {
        urlErr: req.url,
        erroMessage: 'Page not found!',
        auther: 'Muhammad Elabadsa'
    });
});

app.listen(port, () => {
    console.log('Server is listen on port 3000');
});