module.exports = (app) => {
    const customers = require('../controllers/customer.controllers.js');

    /* == USER INTERFACE ADDITIONS == */ 
    app.get('/',customers.rootC);
    /* == USER INTERFACE ADDITIONS == */

    // Create a new Customer
    app.post('/customers', customers.create);

    // Retrieve all Quotations
    app.get('/customers', customers.findAll);

    // Retrieve a single Customer specified by quotationId
    app.get('/customers/:quotationId', customers.findOne);

    // Update a Customer specified by quotationId
    app.put('/customers/:quotationId', customers.update);

    // Delete a Customer specified by quotationId
    app.delete('/customers/:quotationId', customers.delete);

    /* == USER INTERFACE ADDITIONS == */
    app.get('/title/:s',customers.searchTitle);
    app.get('/fname/:s',customers.searchFname);
    app.get('/sname/:s',customers.searchSname);
    app.get('/mobile/:s',customers.searchMobile);
    app.get('/email/:s',customers.searchEmail);
    app.get('/address1/:s',customers.searchAddress1);
    app.get('/address2/:s',customers.searchAddress2);
    app.get('/town/:s',customers.searchTown);
    app.get('/county/:s',customers.searchCounty);
    app.get('/eircode/:s',customers.searchEircode);
    /* == USER INTERFACE ADDITIONS == */
}