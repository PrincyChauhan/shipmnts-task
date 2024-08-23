const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const readExcelFile = (fileName) => {
    try {
        const uploadsDir = path.join(__dirname, 'uploads');
        const filePath = path.join(uploadsDir, fileName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return [];
    }
};


module.exports = readExcelFile;