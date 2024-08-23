## Overview

This project is a web application that allows users to upload Excel files, view their content, and save them to a backend database. The project is divided into two main components: the frontend and the backend.

## Frontend

The frontend is built using React and allows users to upload Excel files, preview their content in a table, and send the file to the backend for processing.

### Features

- File Upload: Users can upload `.xls` or `.xlsx` files.
- Data Preview: The content of the uploaded file is displayed in a table format.
- File Submission: The uploaded file is sent to the backend for further processing.

### Setup Instructions

1. Navigate to the `frontend` directory:

   ```bash
   cd excel-upload-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Access the frontend at http://localhost:3000

### Code Structure

- `src/components/FileUpload.js`: The main component that handles file selection, preview, and upload.
- `src/App.css`: Contains the styles for the application.

### Dependencies

- `React`: Frontend library for building the user interface.
- `Axios`: For making HTTP requests to the backend.
- `XLSX`: For reading and parsing Excel files.

### API Endpoints

- `POST /upload`: Endpoint to handle file uploads from the frontend.s

## Backend

The backend is built using Node.js and Express, and it handles file uploads, processes Excel data, and stores the information in a MongoDB database.

### Features

- **File Upload Handling**: Accepts file uploads from the frontend.
- **Excel Data Parsing**: Extracts data from Excel files and processes it.
- **Data Storage**: Stores company and contact information in a MongoDB database.

## Setup Instructions

### Navigate to the backend directory:

```bash
cd backend
```

### Install dependencies:

```bash
npm install
```

### Change mongo uri in `dbconnection.js`

`MONGO_URI=mongodb://localhost:27017/your-database-name`

### Start the server

```bash
npm start
```

### The backend will be running at http://localhost:3001

## Approach

The project involves building a full-stack application that allows users to upload Excel files, extract and process data, and store it in a MongoDB database. The frontend, built using React, handles file selection and preview, while the backend, developed with Node.js and Express, manages the file upload, parses the Excel data, and stores it in the database.

### Challenges Faced

- **API Calls**: Making API calls from the frontend to the backend had some difficulties, especially with handling network issues and large file uploads.
- **Data Integrity**: Making sure the data was stored correctly in MongoDB, without duplicates and with the right connections between companies and contacts, was a challenge.
