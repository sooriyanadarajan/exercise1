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


// const string = "foo bar ant camel boat";
// const substring = "ant boat";

// console.log(string.includes(substring)); // true

// var myString = "foo bar ant camel boat";
// var myWord = "ant boat"
// var myPattern = new RegExp('(\\w*'+myWord+'\\w*)','gi');

// var matches = myString.match(myPattern);

// if (matches === null)
// {
//     console.log("No results"); // Any message or empty
//     return;
// }

// console.log(matches + " - " +  matches.length + " result(s) found.");


// const filters = req.query;
// const filteredUsers = data.filter(user => {
//   let isValid = true;
//   for (key in filters) {
//     console.log(key, user[key], filters[key]);
//     isValid = isValid && user[key] == filters[key];
//   }
//   return isValid;
// });


// let arr = [4, 32, 2, 5, 8];

// for (let i = 0; i < arr.length; i++) {
//   for (let j = i + 1; j < arr.length; j++) {
//     if (arr[i] > arr[j]) {
//       temp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = temp;
//     }
//   }
// }
// console.log("Sorted array=>", arr);