const express = require('express');
const app = express();
const path = require('path');
const passport = require("passport");
const session = require("express-session");
const store = new session.MemoryStore();
const port = process.env.PORT || 5000;
const dbquery= require('./queries.js');
const {passportRouter}= require('./passport.js'); 
const cors = require('cors');




app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("client/build"));
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname + "client/build")));
}

app.use(
  session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: true,
    store
  })
);
  
app.use(passport.initialize());
app.use(passport.session());



const ensureAuthentication = (req, res, next)=> {
  // Complete the if statement below:
  if(Object.values(store.sessions).length>0 && Object.values(store.sessions)!==null){
    if (JSON.parse(Object.values(store.sessions)[0]).isAuth) {
      req.user_id=JSON.parse(Object.values(store.sessions)[0]).passport.user;
      return next();
    } else {
      // res.redirect('/api/login')
      res.status(403).json({ msg: "You're not authorized to view this page" });
    }
  }else{
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

app.get("/api/logout", (req, res) => {
  req.session.user = null
  

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.destroy(function (err) {
      if (err) next(err)
      for (const key in store.sessions) {
        delete store.sessions[key];
      }
      console.log(store.sessions)
      res.redirect('/')
    })
  
});

app.get('/api/login', (req, res, next)=>{
  res.json({message:'incorrect username/password', redirect:'login'})
})
app.post('/api/login', passport.authenticate('local', {
  failureRedirect: '/api/login'
}), (req, res)=>{
  req.session.isAuth=true;
  res.send({message: 'login success', user: JSON.parse(Object.values(store.sessions)[0]).passport});
});
app.get('/api/register', (req, res, next)=>{
  res.render("register");
})
// app.post('/register', passport.authenticate('register', {
//   failureRedirect: '/register'
// }))

app.get('/api/home', function(req, res, next) {
  console.log(Object.values(store.sessions)[0]);
  if(Object.values(store.sessions)[0]){
    console.log('home request started')
    res.send(JSON.parse(Object.values(store.sessions)[0]).passport);
    console.log('home request finished')

  }else{
    res.status(403).send({message: "user didn't authenticated"})
  }
});

app.get('/api/', (req, res, next)=>{
  res.send("<a href='/auth/google'>Authenticate with google</a>")
});

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
    failureRedirect: '/auth/google/failure'
}), (req, res)=>{
  req.session.isAuth=true;
  res.redirect('/home')
});

app.get('/auth/google/success', (req, res, next)=>{

  res.send('hello welcome')
})

app.get('/auth/google/failure', (req, res, next)=>{
  res.send('failure')
})




app.get('/api/orders', ensureAuthentication, dbquery.getOrders);
app.post('/api/ordersbyid', dbquery.getOrdersById);
app.post('/api/orders', dbquery.createOrders);
app.delete("/api/orders/:id", dbquery.deleteOrder);
app.put("/api/orders", dbquery.updateOrder);
app.get('/api/products', dbquery.getProducts);
app.post('/api/productsbyid', dbquery.getProductsById);
app.post('/api/products', dbquery.createProduct);
app.delete('/api/products/:id', dbquery.deleteProduct);
app.put('/api/products', dbquery.updateProduct);
app.get('/api/carts', dbquery.getCarts);
app.post('/api/carts', dbquery.createCarts);
app.post('/api/register', passportRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

module.exports={store};