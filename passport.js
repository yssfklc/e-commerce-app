var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const bcrypt=require('bcrypt');
const db = require('./clientdb.js');
const dotenv = require('dotenv');
dotenv.config();




passport.serializeUser((user, done) => {
    if(user.rows.length>0){
      done(null, user.rows[0].id);
    }
});
//login
passport.deserializeUser((id, done) => {
    db.pool.query('SELECT * FROM users WHERE id=$1', [id], function (err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
});
//login
passport.use(new LocalStrategy(function verify(username, password, next) {
   
    db.pool.query('SELECT * FROM users WHERE username=$1', [ username ], async (error, user)=>{
    //  await console.log(`The result is ${results.rows[0].password} and th error: ${error} and ${username} and ${password}`)
     if (error) { return next(error); }
     if (user.rows.length===0) { return next(null, false, { message: 'Incorrect username or password.' }); }
    const matchedPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!matchedPassword) {
        return next(null, false, { message: 'Incorrect username or password.' });
    }
       return next(null, user);
    });
}));
//register

const passportRouter=async (request, response)=>{
    const {username, password} = request.body;
    console.log(username);
    try {
        const user = await db.pool.query('SELECT * FROM users WHERE username=$1', [username])
        if(user.rows[0]){
            return response.status(409).json({message:'This account already exists', redirect:'login'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = Math.floor(Math.random()*1000000);
        db.pool.query('INSERT INTO users VALUES ($1, $2, $3)', [id, username, hashedPassword], async(error, result)=>{
        if(error){
            return error
        }
        response.status(200).json({message:'your account is created', redirect:'login'});
    
        })
    }catch(err){
        response.status(500).json({message: err.message});
    }
}
;




const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
        db.pool.query('SELECT * FROM users WHERE username=$1', [ profile.email ], async (error, user)=>{
            //  await console.log(`The result is ${results.rows[0].password} and th error: ${error} and ${username} and ${password}`)
            if (error) { return done(error); }
            if (user.rows.length===0) { return done(null, false, { message: 'Incorrect username or password.' }); }
            return done(null, user);
        });
  }
));

module.exports ={passportRouter};