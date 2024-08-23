const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    companyID: {
        type: Number,
        required: true,
        unique: false
    },
    companyName: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;