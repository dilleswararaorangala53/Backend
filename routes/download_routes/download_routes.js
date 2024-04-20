const express = require('express')
const router = express.Router();
const downloads= require('../../apis/DownloadsApi/DownloadApi')




//------APIS for admin console-------//
//-------APIS for admin console-------//

router.get('/get-downloads',downloads.get_downloads); //api for only admin update events added by any one

router.post('/add-file',downloads.Upload,downloads.add_download)

// router.get('/remove-event/:id',updates.delete_event)

module.exports=router