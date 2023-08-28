const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const passport = require("passport");

const session = require("express-session");
const port = process.env.PORT || 8000;
const dbquery= require('./queries.js');
const passportRouter= require('./passport.js'); 
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
    
  })
);
  
app.use(passport.initialize());
app.use(passport.session());
app.use('/', passportRouter);




// app.get('/login', function(req, res, next) {
//   res.send({"res":'Welcome to the login page'});
// });

app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));

app.get('/home', function(req, res, next) {
  res.send('Welcome to Home Page');
});

app.get('/', (req, res, next)=>{
  res.send('Selam hoş geldin')
});




app.get('/orders', dbquery.getOrders);
app.post('/orders', dbquery.createOrders);
app.delete("/orders/:id", dbquery.deleteOrder);
app.put("/orders", dbquery.updateOrder);
app.get('/products', dbquery.getProducts);
app.post('/products', dbquery.createProduct);
app.delete('/products/:id', dbquery.deleteProduct);
app.put('/products', dbquery.updateProduct);
app.get('/carts', dbquery.getCarts);
app.post('/carts', dbquery.createCarts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});