const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const passport = require("passport");
const session = require("express-session");
const store = new session.MemoryStore();

const port = process.env.PORT || 8000;
const dbquery= require('./queries.js');
const passportRouter= require('./passport.js'); 
const cors = require('cors');
const Cookies = require('js-cookie');



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

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

passport.serializeUser((user, done) => {
  done(null, {user_id:user.rows[0].id, username:user.rows[0].username});
});



const ensureAuthentication = (req, res, next)=> {
  // Complete the if statement below:
  if(Object.values(store.sessions).length>0 && Object.values(store.sessions)!==null){
    if (JSON.parse(Object.values(store.sessions)[0]).isAuth) {
      return next();
    } else {
      res.redirect('/login')
      res.status(403).json({ msg: "You're not authorized to view this page" });
    }
  }else{
    res.status(403).json({ msg: "You're not authorized to view this page" });
  }
}

app.get("/logout", (req, res) => {
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
  
  // req.logout();
  // res.redirect("/login");
});

app.get('/login', (req, res, next)=>{
  res.render("login");
})
app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'
}), (req, res)=>{
  req.session.isAuth=true;
  res.redirect('/home' )
});

app.get('/home', function(req, res, next) {
  res.send(JSON.parse(Object.values(store.sessions)[0]).passport);
});

app.get('/', (req, res, next)=>{
  res.send('successful')
});




app.get('/orders', ensureAuthentication, dbquery.getOrders);
app.post('/ordersbyid', dbquery.getOrdersById);
app.post('/orders', dbquery.createOrders);
app.delete("/orders/:id", dbquery.deleteOrder);
app.put("/orders", dbquery.updateOrder);
app.get('/products', dbquery.getProducts);
app.post('/productsbyid', dbquery.getProductsById);
app.post('/products', dbquery.createProduct);
app.delete('/products/:id', dbquery.deleteProduct);
app.put('/products', dbquery.updateProduct);
app.get('/carts', dbquery.getCarts);
app.post('/carts', dbquery.createCarts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});