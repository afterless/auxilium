const express = require('express');
const mongoose = require('mongoose');
const twilio = require('twilio');
const routes = require('./routes/api');
const twilioRoutes = require('./routes/twilioApi');
require('dotenv').config();

const app = express();
const twilioApp = express();

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => consle.log(err))

mongoose.Promise = global.Promise

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

twilioApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use('/api', routes);
twilioApp.use(express.json())
twilioApp.use('/api', routes);

twilioApp.use(express.urlencoded({ extended: false }));
twilioApp.use('/', twilioRoutes)

app.use((err, req, res, next) => {
    console.log(err);
    next();
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

twilioApp.listen(1337, () => {
    console.log(`Twilio Listener listening on port 1337`)
})
