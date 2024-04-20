const multer = require('multer');
const fs = require('fs')
const connection = require('../config')

const storage = multer.diskStorage({
  destination: (req, file, cb )=>{
    return cb(null,'./storage/nss_downloads/')
  },
  filename: (req, file, cb)=>{
    return cb(null,`${file.originalname}`)
  }
})

exports.Upload = multer({storage}).single('file')

exports.add_download =  (req, res) => {

  const  data  = req.body;
  const  file  = req.file;
  console.log("File"+file.originalname)
  const sql = 'INSERT INTO nss_downloads ( title,  file_path) VALUES (?, ?)';
  const values = [ data.title,  file.originalname];
  console.log({values})
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
};



exports.get_downloads=(req, res) => {
  const sql = "SELECT * FROM nss_downloads ORDER BY id DESC";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: `Error retrieving data${err} `});
      return;
    }
    const final_events = results.map(eve=>{
      const filelink =`http:localhost:8888/downloads/${eve.file_path}`
      const outdate=new Date(eve.date)

      return {
        ...eve,
        file_link:filelink,
        day:outdate.getDate(),
        month: outdate.toLocaleString('en-US', { month: 'short' }),
        year: outdate.getFullYear(),
      }
    })

    console.log('Data retrieved successfully');

    res.json(final_events);
  });
};
