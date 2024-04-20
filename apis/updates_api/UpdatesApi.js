const multer = require('multer');
const fs = require('fs')
const connection = require('../config')
require('dotenv').config()
// const api_ip = process.env.domainip
const api_ip = 'http://localhost:8888'

const storage = multer.diskStorage({
  destination: (req, file, cb )=>{
    return cb(null,'./storage/nss_notifications/')
  },
  filename: (req, file, cb)=>{
    return cb(null,`${file.originalname}`)
  }
})

exports.Upload = multer({storage}).single('file')

exports.insert_event =  (req, res) => {

  const  update  = req.body;
  const  file  = req.file;
  console.log(update)
  console.log("File"+file.originalname)
  const sql = 'INSERT INTO nss_notification_updates ( date, title,  file_path) VALUES (?, ?, ?)';
  const values = [update.date, update.title,  file.originalname];
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

exports.delete_event=(req, res) => {
  // const filepath = './storage/nss_notifications/'
  const id = req.params.id;
  const sel = `SELECT * FROM nss_notification_updates WHERE id = ${id}`;
  const del = `DELETE FROM nss_notification_updates WHERE id = ${id}`;
  
  connection.query(sel, (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).json({ error: 'Error deleting data' });
      return;
    }
    
    const filepath = `./storage/nss_notifications/${result[0].file_path}`
    
    connection.query(del, (err,result)=>{
      if(err){
        console.log(err);
        res.status(500).json({ error: 'No Records Found!' });
        return;
      }else{
        fs.access(filepath, fs.constants.F_OK, (err) => {
          if(err) {
            res.json(err)
            console.error('File does not exist');
            return;
          }
        
          fs.unlink(filepath, (err) => {
            if (err) {
              console.error('Error removing file:', err);
              return;
            }
            console.log('File removed successfully');
          });
        });
      }
    });

    console.log('Data deleted successfully');
    res.json({ message: 'Data deleted successfully'});
  });
  
  
};



exports.every_events=(req, res) => {
  const sql = "SELECT * FROM nss_notification_updates ORDER BY id DESC";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: `Error retrieving data${err} `});
      return;
    }
    const final_events = results.map(eve=>{
      const filelink =`${api_ip}/media/${eve.file_path}`
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
