const express = require("express")
const router = express.Router()
const cors = require('cors')

const app = express()

app.use(express.json());
const adminauth= require('../../apis/Login/admin_auth')


router.get('/getadmins',adminauth.alladmins)
router.post('/login',adminauth.login)
router.get('/getrole',adminauth.role_session)


module.exports=router