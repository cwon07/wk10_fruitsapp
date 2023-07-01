require('dotenv').config();
const express = require('express');
const FruitRouter = require('./controllers/fruit');
const UserRouter = require('./controllers/user');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session'); 
const MongoStore = require('connect-mongo'); //MongoStore is a model


//middleware
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
// sets up the ability to track if the user has authorization to access authorized routes
app.use(session({
    secret: process.env.SECRET, 
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
})); //<- must be on top of routers
//will have a prefix of /fruit on top of what is defined as a path on Fruitrouter
app.use("/fruits", FruitRouter);
app.use('/user', UserRouter); // now it must be typed /user/login etc.



app.get('/', (req, res) => {
    res.render('index.ejs')
})

const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`app listening on port ${PORT}`));