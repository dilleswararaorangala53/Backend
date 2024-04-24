const express = require('express')
const router = express.Router();
const updates= require('../../apis/updates_api/UpdatesApi')




//------APIS for admin console-------//
//-------APIS for admin console-------//

router.get('/every-events',updates.every_events); //api for only admin update events added by any one

router.post('/add-event',updates.Upload,updates.insert_event)

router.post('/remove-event',updates.delete_event)

module.exports=router