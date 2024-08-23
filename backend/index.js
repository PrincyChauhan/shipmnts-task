const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const readExcelFile = require('./readExcel');
const uploadsDir = 'uploads/';
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
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    readExcelFile(req.file.filename);
    res.send({
        message: 'File uploaded successfully',
        file: req.file
    });
});

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});