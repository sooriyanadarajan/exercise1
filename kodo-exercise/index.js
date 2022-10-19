require('dotenv').config({ path: __dirname + '/config/.env' })
const express = require('express')
const http = require('http')
const useragent = require('express-useragent')

const cookieParser = require('cookie-parser')

require('./config/db')
const collection = require('./router/collection')

const { seedMaintenanceSettings } = require("./seeds/details");
seedMaintenanceSettings();
const app = express()
app.use(express.json())
const port = process.env.PORT || 7795


app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(useragent.express())
app.use(collection)

const server = app.listen(port, () => {
    console.log("Kodo-Exercise Running on : localhost", process.env.PORT);
})

process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
