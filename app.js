const express = require('express');
const pageRoute = require('./routes/pageRoute');
const mongoose = require('mongoose');
const courseRoute = require('./routes/courseRoute');
const { use } = require('./routes/pageRoute');

const app = express();

//connect db
mongoose.connect('mongodb://localhost/smartedu-db', {
  useUnifiedTopology: true
}).then(() => {
  console.log('DB Connected Successfuly')
});

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
