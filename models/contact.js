const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"Please enter first name"]
    },
    lastName:{
        type : String,
        required: [true,"Please enter last name"]
    },
    email:{
        type : String,
        required: [true,"Please enter email"]

    },
    phone:{
        type: Number,
        required: [true, "Please enter phone number"]
    }
    },
    {
        timestamps: true
    }

)

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact;