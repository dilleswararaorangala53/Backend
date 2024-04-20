const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()
//Routes Import
const schemas = require("../Backend_Console/Schemes/AllSchemas");
const admins = require("../Backend_Console/routes/admin_routes/AdminRoute");
const updates = require("../Backend_Console/routes/updates_routes/upates_api_routes");
const downloads=require("../Backend_Console/routes/download_routes/download_routes")
//middle ware import
app.use(express.json());

const session = require("express-session");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const con = require("../project4-2/Controllers/src/Backend/apis/config");
app.use(express.json());
app.use(cors());


app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  }),
);

app.use("/media", express.static("./storage/nss_notifications"));
app.use("/downloads", express.static("./storage/nss_downloads"));
//apis start
app.use("/api/admins", admins);
app.use("/api/updates", updates);
app.use("/api/downloads",downloads)

// server listener
const port = 8888;
app.listen(port, () => {
  schemas.allSchemas();
  console.log(`Server ruinning at port no:${port}`);
});
