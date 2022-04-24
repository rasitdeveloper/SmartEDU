const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

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
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
