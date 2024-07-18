import express from 'express';
import multer from 'multer';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')));

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);

  try {
    const existingPdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText('Here is a table:', {
      x: 50,
      y: height - 100,
      size: 18,
    });

    // Draw a simple table
    const tableTop = height - 150;
    const tableLeft = 50;
    const cellWidth = 100;
    const cellHeight = 20;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        firstPage.drawRectangle({
          x: tableLeft + j * cellWidth,
          y: tableTop - i * cellHeight,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();
    fs.unlinkSync(filePath); // Remove the uploaded file

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=modified.pdf',
    });

    res.send(Buffer.from(modifiedPdfBytes));
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send('Error processing PDF');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
