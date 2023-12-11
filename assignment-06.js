//Tested Using
//OS: Windows 10 Pro
//browser: FireFox 88.0.1 (64-bit)

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();                      

/* == USER INTERFACE ADDITIONS == */
const hbs = require('hbs');
const path = require('path');
/* == USER INTERFACE ADDITIONS == */

// parse the different kinds of requests (content-type) the app handles
// use the "use" method to set up the body-parser middlewear
app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // application/x-www-form-urlencoded

/* == USER INTERFACE ADDITIONS == */
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.use('/assets',express.static(__dirname + '/public'));
/* == USER INTERFACE ADDITIONS == */

// Set up Mongoose and Database connection
const mongoose = require('mongoose');

// Set up connection to the database using Mongodb Atlas
mongoose.connect("DB String goes here", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});

require('./apps/routes/customer.routes.js')(app);
require('./apps/routes/phone.routes.js')(app);
require('./apps/routes/order.routes.js')(app);

// listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});