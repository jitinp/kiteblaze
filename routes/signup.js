var express = require('express');
var router = express.Router();

module.exports = function(passport) {

	/* GET about page. */
	router.get('/', function(req, res, next) {
	  res.render('signup', { title: 'Kiteblaze | Signup with Github', page: 'signup' });
	});

	router.post('/login', passport.authenticate('login', {
		    successRedirect: '/deploy',
		    failureRedirect: '/#loginforce',
		    failureFlash : true 
		  }));

	router.post('/register', passport.authenticate('register', {
            successRedirect : '/', // redirect to home page
            failureRedirect : '/#registerforce', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

	router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/#');
    });

	return router;
}