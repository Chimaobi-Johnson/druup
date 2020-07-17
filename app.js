const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to parse incoming json data


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(authRoutes);
app.use(appRoutes);


app.use((error, req, res, next) => {
  console.log(error);
    res.status(error.httpStatusCode).json({ message: error.message })
})

mongoose.connect(keys.mongoURI)
.then(connected => {
	console.log('Database Connected');
}).catch(err => {
	console.log(err);
})

if(process.env.NODE_ENV === "production") {
  // express will serve up production assets like main.js
  // and main.css
  app.use(express.static("client/build"));

  // express will serve up index.html if
  // it doesnt recognize the route
  const path = require("path");
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
