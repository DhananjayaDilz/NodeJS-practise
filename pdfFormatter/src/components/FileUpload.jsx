import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PDFDocument, rgb } from 'pdf-lib';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const pdfBytes = new Uint8Array(e.target.result);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Add a new page
      const newPage = pdfDoc.addPage();
      const { width, height } = newPage.getSize();

      // Table headers
      newPage.drawText('Car Name', {
        x: 50,
        y: height - 50,
        size: 12,
        color: rgb(0, 0, 0),
      });

      newPage.drawText('Price', {
        x: 150,
        y: height - 50,
        size: 12,
        color: rgb(0, 0, 0),
      });

      // Table content
      const carData = [
        { name: 'Toyota', price: '$20,000' },
        { name: 'Honda', price: '$22,000' },
        { name: 'Ford', price: '$25,000' },
        { name: 'Chevrolet', price: '$24,000' },
        { name: 'BMW', price: '$30,000' },
      ];

      const tableTop = height - 70;
      const cellWidth = 100;
      const cellHeight = 20;

      carData.forEach((car, index) => {
        const y = tableTop - index * cellHeight;

        // Draw table rows
        newPage.drawText(car.name, {
          x: 50,
          y,
          size: 12,
          color: rgb(0, 0, 0),
        });

        newPage.drawText(car.price, {
          x: 150,
          y,
          size: 12,
          color: rgb(0, 0, 0),
        });

        // Draw table cell borders
        newPage.drawRectangle({
          x: 50,
          y: y - 5,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });

        newPage.drawRectangle({
          x: 150,
          y: y - 5,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <h1>PDFs Uploader</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="application/pdf" />
        <button type="submit">Upload</button>
      </form>
      {downloadLink && (
        <a href={downloadLink} download="modified.pdf">Download Modified PDF</a>

      )}
    </div>
  );
};

export default FileUpload;