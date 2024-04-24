const multer = require('multer');
const fs = require('fs');
const connection = require('../config');
require('dotenv').config();

const api_ip = 'http://localhost:8888';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage/nss_latestnews/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

exports.Upload = multer({ storage }).single('file');

exports.insert_event = (req, res) => {
  const update = req.body;
  const file = req.file;

  const sql = 'INSERT INTO nss_latest_news (date, title, file_path) VALUES (?, ?, ?)';
  const values = [update.date, update.title, file.originalname];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
};

exports.delete_event = (req, res) => {
  const id = req.body.id;
  const del = `DELETE FROM nss_latest_news WHERE id = ${id}`;
  
  connection.query(del, (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Error deleting data' });
      return;
    }
    
    if (result.affectedRows === 0) {
      console.error('No Records Found');
      res.status(404).json({ error: 'No Records Found' });
      return;
    }

    if (result && result.length > 0 && result[0].file_path) {
      const filepath = `./storage/nss_latestnews/${result[0].file_path}`;

      fs.unlink(filepath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error removing file:', unlinkErr);
          res.status(500).json({ error: 'Error removing file' });
          return;
        }
        console.log('File removed successfully');
      });
    }

    console.log('Data deleted successfully');
    res.json({ message: 'Data deleted successfully'});
  });
};

exports.every_events = (req, res) => {
  const sql = "SELECT * FROM nss_latest_news ORDER BY id DESC";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).json({ error: 'Error retrieving data' });
    }

    const final_events = results.map(eve => {
      const filelink = `${api_ip}/latestnews/${eve.file_path}`;
      const outdate = new Date(eve.date);

      return {
        ...eve,
        file_link: filelink,
        day: outdate.getDate(),
        month: outdate.toLocaleString('en-US', { month: 'short' }),
        year: outdate.getFullYear(),
      };
    });

    console.log('Data retrieved successfully');
    res.json(final_events);
  });
};
