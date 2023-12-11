module.exports = (app) => {
    const orders = require('../controllers/order.controllers.js');

    /* == USER INTERFACE ADDITIONS == */ 
    app.get('/O',orders.rootO);
    /* == USER INTERFACE ADDITIONS == */

    // Create a new Order
    app.post('/orders', orders.create);

    // Retrieve all Quotations
    app.get('/orders', orders.findAll);

    // Retrieve a single Order specified by quotationId
    app.get('/orders/:quotationId', orders.findOne);

    // Update a Order specified by quotationId
    app.put('/orders/:quotationId', orders.update);

    // Delete a Order specified by quotationId
    app.delete('/orders/:quotationId', orders.delete);

    /* == USER INTERFACE ADDITIONS == */
    app.get('/fnameO/:s',orders.searchFnameO);
    app.get('/snameO/:s',orders.searchSnameO);
    app.get('/modelO/:s',orders.searchModelO);
    /* == USER INTERFACE ADDITIONS == */



}