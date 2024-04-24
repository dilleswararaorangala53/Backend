const express = require('express')
const router = express.Router();
const latestnews= require('../../apis/LatestNews/latestNewsApi')




//------APIS for admin console-------//
//-------APIS for admin console-------//

router.get('/every-events',latestnews.every_events); //api for only admin update events added by any one

router.post('/add-event',latestnews.Upload,latestnews.insert_event)

router.post('/remove-event',latestnews.delete_event)

module.exports=router