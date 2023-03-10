// import express
const express = require('express');
const cors = require('cors')

// const SwaggerUI = require('swagger-ui')

// import dotenv to read .env file
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "*", 
}))

app.get('/',(req,res)=>{
    res.redirect('/items')
})
// import routes
const itemsRoutes = require('./routes/itemRoutes');
app.use('/items',itemsRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users',userRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/cart',cartRoutes);

// // define images folder
// app.use('/images', express.static('./images'));

// // define styles folder
// app.use('/styles', express.static('./views/styles'));

// // set view engine
// app.set('view engine', 'ejs');

// // set view directory
// app.set('views', 'views');
app.use((req,res)=>{
    console.log('disconectting')
    res.locals.sqlConnection.end()
})
app.listen(process.env.PORT || '3000', () => {
    console.log('Listening to port 3000..');
});
