// "npm start" to run the project

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config()

const app = express();

//connect db
mongoose.connect(`mongodb+srv://rasit:${process.env.DBKEY}@cluster0.s5dmwki.mongodb.net/smartedu?retryWrites=true&w=majority`, {
  useUnifiedTopology: true
}).then(() => {
  console.log('DB Connected Successfuly')
}).catch((error) => {
  console.log('DB Connect Failed')
})

//template engine
app.set("view engine", "ejs");

//global variable
global.userIN = null;

//middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: `mongodb+srv://rasit:${process.env.DBKEY}@cluster0.s5dmwki.mongodb.net/smartedu?retryWrites=true&w=majority`})
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method', {
  methods:['POST', 'GET']
}));


//routes
app.use('*', (req,res,next) => {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
