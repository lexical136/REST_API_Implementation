const Quotation = require('../models/order.model.js');

/* == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.rootO = (req, res) => {
    Quotation.find()
    .then(clients => {
        res.render('quotations_view',{
            results3: clients
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all orders."
        });
    });
};

// search for quotations, matching string on first name field
exports.searchFnameO = (req, res) => {
    var search = req.params.s;
    console.log("Searching First Name: "+search)
    Quotation.find({ fnameO: new RegExp(search,"ig")})
    .then(clients => {
        res.render('quotations_view' ,{
            results3: clients
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
        });
    });
};

// search for quotations, matching string on surname field
exports.searchSnameO = (req, res) => {
    var search = req.params.s;
    console.log("Searching Surnames: "+search)
    Quotation.find({ snameO: new RegExp(search,"ig")})
    .then(clients => {
        res.render('quotations_view',{
            results3: clients
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
        });
    });
};

// search for quotations, matching string on model field
exports.searchModelO = (req, res) => {
    var search = req.params.s;
    console.log("Searching Models: "+search)
    Quotation.find({ modelO: new RegExp(search,"ig")})
    .then(clients => {
        res.render('quotations_view',{
            results3: clients
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
        });
    });
};

/* == USER INTERFACE ADDITIONS == */


// Create and Save a new Order
exports.create = (req, res) => {
    // Validate the request
    if(!req.body.fnameO | !req.body.snameO | !req.body.modelO) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a new Order (using schema)
    const quotation = new Quotation({
        fnameO: req.body.fnameO,
        snameO: req.body.snameO,
        modelO: req.body.modelO
    });

    // Save Order in the database
    quotation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Orders."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Quotation.find()
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Orders."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Quotation.findById(req.params.quotationId)
    .then(quotation => {
        if(!quotation) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });            
        }
        res.send(quotation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Order with id " + req.params.quotationId
        });
    });
};

// Update a Order identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.fnameO | !req.body.snameO | !req.body.modelO) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    // Find the Order and update it with the request body
    Quotation.findByIdAndUpdate(req.params.quotationId, {
        fnameO: req.body.fnameO,
        snameO: req.body.snameO,
        modelO: req.body.modelO
    }, { $set: req.body })   // $set - modify only the supplied fields
       //{ new: true })        // "new: true" return updated object
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });
        }
        res.send(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.quotationId
        });
    });
};

// Update a Order identified by the quotationId in the request
exports.updateQuote = (req, res) => {
    // Validate Request
    if(!req.body.fnameO | !req.body.snameO | !req.body.modelO) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    // Find the Order and update it with the request body
    Quotation.findByIdAndUpdate(req.params.quotationId, {
        fnameO: req.body.fnameO,
        snameO: req.body.snameO,
        modelO: req.body.modelO
    },
       { new: true })  // "new: true" return updated object
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });
        }
        res.send(quotation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Order with id " + req.params.quotationId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Quotation.findByIdAndRemove(req.params.quotationId)
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Order with id " + req.params.quotationId
        });
    });
};