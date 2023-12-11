module.exports = (app) => {
    const phones = require('../controllers/phone.controllers.js');

    /* == USER INTERFACE ADDITIONS == */
    app.get('/P',phones.rootP);
    /* == USER INTERFACE ADDITIONS == */

    // Create a new Phone
    app.post('/phones', phones.create);

    // Retrieve all Quotations
    app.get('/phones', phones.findAll);

    // Retrieve a single Phone specified by quotationId
    app.get('/phones/:quotationId', phones.findOne);

    // Update a Phone specified by quotationId
    app.put('/phones/:quotationId', phones.update);

    // Delete a Phone specified by quotationId
    app.delete('/phones/:quotationId', phones.delete);

    /* == USER INTERFACE ADDITIONS == */
    app.get('/model/:s',phones.searchModel); 
    app.get('/manufacturer/:s',phones.searchManufacturer);
    app.get('/price/:s',phones.searchPrice);
    /* == USER INTERFACE ADDITIONS == */
}