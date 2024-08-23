import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../App.css";
import axios from "axios";

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const clear = () => {
    setData([]);
    setFile(null);
    setUploadStatus("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Read the file to display its contents
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(`File uploaded successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("");
    }
  };

  const renderTableHeader = () => {
    if (data.length === 0) return null;
    const headers = Object.keys(data[0]);
    return (
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return data.map((row, index) => (
      <tr key={index}>
        {Object.values(row).map((value, idx) => (
          <td key={idx}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        accept=".xls, .xlsx"
        onChange={handleFileChange}
        className="upload-button"
      />
      <button onClick={handleFileUpload} className="upload-button">
        Upload File
      </button>
      <button onClick={clear} className="cancle-button">
        Cancle File
      </button>
      <div className="table-container">
        {data.length > 0 && (
          <table className="data-table">
            {renderTableHeader()}
            <tbody>{renderTableRows()}</tbody>
          </table>
        )}
      </div>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
