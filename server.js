// var passport = require('passport');
// var LocalStrategy = require('passport-local');

// passport.use(new LocalStrategy(function verify(email, password, done) {
//   pool.query('SELECT * FROM users WHERE email =$1', [ email ], function(err, user) {
//     if (err) { return done(err); }
//     if (!user) { return done(null, false, { message: 'Incorrect username or password.' }); }
//     if (user.password != password) {
//         return done(null, false, { message: 'Incorrect username or password.' });
//     }
//     return done(null, user);
   
//   });
// }));