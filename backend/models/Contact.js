const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    contactID: {
        type: Number,
        required: true,
        unique: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;