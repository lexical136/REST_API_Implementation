const Quotation = require('../models/customer.model.js');
//const Quotation2 = require('../models/client.model.js');

/* == USER INTERFACE ADDITIONS == */
// Default message for / (get)
exports.rootC = (req, res) => {
    //console.log("Testing");
    Quotation.find()
    .then(customers => {
        res.render('quotations_view',{
            results: customers,
            //results2: physiotherapists
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customerss."
        });
    });
};

// search for customers, matching string on First Name field
exports.searchFname = (req, res) => {
    var search = req.params.s;
    console.log("Searching First Name: "+search)
    Quotation.find({ fname: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view' ,{
            results: customers,
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on Surname field
exports.searchSname = (req, res) => {
    var search = req.params.s;
    console.log("Searching Surname: "+search)
    Quotation.find({ sname: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on mobile field
exports.searchMobile = (req, res) => {
    var search = req.params.s;
    console.log("Searching Mobile: "+search)
    Quotation.find({ mobile: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on title field
exports.searchTitle = (req, res) => {
    var search = req.params.s;
    console.log("Searching Title: "+search)
    Quotation.find({ title: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on email field
exports.searchEmail = (req, res) => {
    var search = req.params.s;
    console.log("Searching Email: "+search)
    Quotation.find({ email: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on address1 field
exports.searchAddress1 = (req, res) => {
    var search = req.params.s;
    console.log("Searching Address Line 1: "+search)
    Quotation.find({ address1: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on address2 field
exports.searchAddress2 = (req, res) => {
    var search = req.params.s;
    console.log("Searching Address Line 2: "+search)
    Quotation.find({ address2: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on town field
exports.searchTown = (req, res) => {
    var search = req.params.s;
    console.log("Searching Town: "+search)
    Quotation.find({ town: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on county field
exports.searchCounty = (req, res) => {
    var search = req.params.s;
    console.log("Searching County: "+search)
    Quotation.find({ county: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// search for customers, matching string on eircode field
exports.searchEircode = (req, res) => {
    var search = req.params.s;
    console.log("Searching Eircodes: "+search)
    Quotation.find({ eircode: new RegExp(search,"ig")})
    .then(customers => {
        res.render('quotations_view',{
            results: customers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};
/* == USER INTERFACE ADDITIONS == */

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate the request
    if(!req.body.fname | !req.body.sname | !req.body.mobile | !req.body.email | req.body.address1 | req.body.address2 | req.body.eircode) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a new Customer (using schema)
    const quotation = new Quotation({
        title: req.body.title,
        fname: req.body.fname,
        sname: req.body.sname,
        mobile: req.body.mobile,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        town: req.body.town,
        county: req.body.county,
        eircode: req.body.eircode
    });

    // Save Customer in the database
    quotation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Customer."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Quotation.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all customers."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Quotation.findById(req.params.quotationId)
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });            
        }
        res.send(customers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.quotationId
        });
    });
};

// Update a Customer identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.fname | !req.body.sname | !req.body.mobile | !req.body.email | req.body.address1 | req.body.address2 | req.body.eircode) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    // Find the Customer and update it with the request body
    Quotation.findByIdAndUpdate(req.params.quotationId, {
        title: req.body.title,
        fname: req.body.fname,
        sname: req.body.sname,
        mobile: req.body.mobile,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        town: req.body.town,
        county: req.body.county,
        eircode: req.body.eircode
    }, { $set: req.body })   // $set - modify only the supplied fields
       //{ new: true })        // "new: true" return updated object //Removing this makes it work idk Y
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });
        }
        res.send(customers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params.quotationId
        });
    });
};

// Update a Customer identified by the quotationId in the request
exports.updateQuote = (req, res) => {
    // Validate Request
    if(!req.body.quotation) {
        return res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    // Find the Customer and update it with the request body
    Quotation.findByIdAndUpdate(req.params.quotationId, {
        quotation: req.body.quotation
    },
       { new: true })  // "new: true" return updated object
    .then(quotation => {
        if(!quotation) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });
        }
        res.send(quotation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Error updating Customer with id " + req.params.quotationId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Quotation.findByIdAndRemove(req.params.quotationId)
    .then(quotation => {
        if(!quotation) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.quotationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Customer with id " + req.params.quotationId
        });
    });
};