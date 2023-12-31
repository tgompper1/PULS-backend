const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//test 

// routes
const posts = require('./Routes/api/posts');
const events = require('./Routes/api/events');
const authRoute = require("./Routes/api/AuthRoute");
const settings = require("./Routes/api/settings");

const app = express();
connectDB();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://polite-quokka-e29580.netlify.app');
//   next();
// });
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

// cors
app.use(cors({origin: true, credentials: true}));

// init Middleware
app.use(express.json({extended: false}));

// for importing images
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/posts', posts);
app.use('/api/events', events);
app.use("/", authRoute);
app.use("/api/settings", settings);

const PORT = process.env.port || 80//01

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});