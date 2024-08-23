import React, { useState } from "react";
import * as XLSX from "xlsx";
import "../App.css"; // Import the CSS file

const FileUpload = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      };

      reader.readAsBinaryString(file);
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
        onChange={handleFileUpload}
        className="upload-button"
      />
      <div className="table-container">
        {data.length > 0 && (
          <table className="data-table">
            {renderTableHeader()}
            <tbody>{renderTableRows()}</tbody>
          </table>
        )}
      </div>
      <button className="upload-button">Upload File</button>
    </div>
  );
};

export default FileUpload;
