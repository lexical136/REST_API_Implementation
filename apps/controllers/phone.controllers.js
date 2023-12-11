const Quotation = require('../models/phone.model.js');

/* == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.rootP = (req, res) => {
    Quotation.find()
    .then(phones => {
        res.render('quotations_view',{
            results2: phones
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all phones."
        });
    });
};

// search for quotations, matching string on model field
exports.searchModel = (req, res) => {
    var search = req.params.s;
    console.log("Searching Model: "+search)
    Quotation.find({ model: new RegExp(search,"ig")})
    .then(phones => {
        res.render('quotations_view' ,{
            results2: phones
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all phones."
        });
    });
};

// search for quotations, matching string on Manufacturer field
exports.searchManufacturer = (req, res) => {
    var search = req.params.s;
    console.log("Searching Manufacturer: "+search)
    Quotation.find({ manufacturer: new RegExp(search,"ig")})
    .then(phones => {
        res.render('quotations_view' ,{
            results2: phones
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all phones."
        });
    });
};

// search for quotations, matching string on price field
exports.searchPrice = (req, res) => {
    var search = req.params.s;
    console.log("Searching Price: "+search)
    Quotation.find({ price: new RegExp(search,"ig")})
    .then(phones => {
        res.render('quotations_view',{
            results2: phones
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all phones."
        });
    });
};

/* == USER INTERFACE ADDITIONS == */

// Create and Save a new Phone
exports.create = (req, res) => {
    // Validate the request
    if(!req.body.model | !req.body.manufacturer | !req.body.price) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a new Phone (using schema)
    const quotation = new Quotation({
        model: req.body.model,
        manufacturer: req.body.manufacturer, 
        price: req.body.price
    });

    // Save Phone in the database
    quotation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the phones."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Quotation.find()
    .then(phones => {
        res.send(phones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all phones."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Quotation.findById(req.params.quotationId)
    .then(phones => {
        if(!phones) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });            
        }
        res.send(phones);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Phone with id " + req.params.quotationId
        });
    });
};

// Update a Phone identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.model | !req.body.manufacturer | !req.body.price) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    // Find the Phone and update it with the request body
    Quotation.findByIdAndUpdate(req.params.quotationId, {
        model: req.body.model,
        manufacturer: req.body.manufacturer, 
        price: req.body.price
    }, { $set: req.body })   // $set - modify only the supplied fields
       //{ new: true })        // "new: true" return updated object
    .then(phones => {
        if(!phones) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });
        }
        res.send(phones);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Phone with id " + req.params.quotationId
        });
    });
};

// Update a Phone identified by the quotationId in the request
exports.updateQuote = (req, res) => {
    // Validate Request
    if(!req.body.phones) {
        return res.status(400).send({
            message: "Phone content cannot be empty"
        });
    }

    // Find the Phone and update it with the request body
    Quotation.findByIdAndUpdate(req.params.quotationId, {
        model: req.body.model,
        manufacturer: req.body.manufacturer, 
        price: req.body.price
    },
       { new: true })  // "new: true" return updated object
    .then(phones => {
        if(!phones) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });
        }
        res.send(phones);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Phone with id " + req.params.quotationId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Quotation.findByIdAndRemove(req.params.quotationId)
    .then(phones => {
        if(!phones) {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });
        }
        res.send({message: "Phone deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Phone not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Phone with id " + req.params.quotationId
        });
    });
};