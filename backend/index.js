// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const readExcelFile = require('./readExcel');
// const uploadsDir = 'uploads/';
// const db = require("./dbConnection");

// const app = express();
// const port = 3001;

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// // Route to handle file uploads
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     readExcelFile(req.file.filename);
//     res.send({
//         message: 'File uploaded successfully',
//         file: req.file
//     });
// });

// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const readExcelFile = require('./readExcel');
const Company = require('./models/Company'); // Adjust path as needed
const Contact = require('./models/Contact'); // Adjust path as needed
const db = require("./dbConnection");

const app = express();
const port = 3001;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to handle file uploads
app.post('/upload', upload.single('file'), async(req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
        const data = await readExcelFile(req.file.filename);

        // Extract unique company data
        const companyData = data.map(item => ({
            companyID: item['company ID'],
            companyName: item['Company Name'],
            industry: item['Industry'],
            location: item['Location']
        }));

        // Remove duplicate companies by `companyID`
        const uniqueCompanies = [...new Map(companyData.map(item => [item.companyID, item])).values()];

        // Insert unique companies and get their _id values
        const insertedCompanies = await Company.insertMany(uniqueCompanies, { upsert: true });

        // Create a mapping from companyID to company _id
        const companyIdMapping = insertedCompanies.reduce((acc, company) => {
            acc[company.companyID] = company._id;
            return acc;
        }, {});

        // Extract contact data and map companyID to company _id
        const contactData = data.map(item => ({
            contactID: item['Contact ID'],
            company_id: companyIdMapping[item['company ID']], // Map companyID to _id
            firstName: item['First Name'],
            lastName: item['Last Name'],
            email: item['Email'],
            phone: item['Phone']
        }));

        await Contact.insertMany(contactData, { upsert: true });

        res.send({
            message: 'File uploaded and data inserted into MongoDB successfully',
            file: req.file
        });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).send('Error inserting data into MongoDB');
    }
});

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});