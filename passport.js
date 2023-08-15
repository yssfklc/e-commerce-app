const express = require('express');
const passportRouter = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const db = require('./clientdb.js');





//login
passport.serializeUser((user, done) => {
    done(null, user.rows[0].id);
  });
  
passport.deserializeUser((id, done) => {
    db.pool.query('SELECT * FROM users WHERE id=$1', [id], function (err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
});
  
passport.use(new LocalStrategy(function verify(username, password, done) {
   
    db.pool.query('SELECT * FROM users WHERE username=$1', [ username ], async (error, user)=>{
    //  await console.log(`The result is ${results.rows[0].password} and th error: ${error} and ${username} and ${password}`)
     if (error) { return done(error); }
  
     if (await !user) { return done(null, false, { message: 'Incorrect username or password.' }); }
    
    const matchedPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!matchedPassword) {
        return done(null, false, { message: 'Incorrect username or password.' });
    }
       console.log('login başarılı');
       return done(null, user);
    });
}));
//register

passportRouter.post('/register', async (request, response)=>{
        const {username, password} = request.body;
        try {
            const user = await db.pool.query('SELECT * FROM users WHERE username=$1', [username])
            console.log(user.rows[0]);
            if(user.rows[0]){
                console.log('User already exist');
                return response.redirect('login');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const id = Math.floor(Math.random()*1000000);
            db.pool.query('INSERT INTO users VALUES ($1, $2, $3)', [id, username, hashedPassword], async(error, result)=>{
            if(error){
                return error
            }
            response.redirect('login')
        
            })
        }catch(err){
            response.status(500).json({message: err.message});
        }
    }
);

module.exports =passportRouter;