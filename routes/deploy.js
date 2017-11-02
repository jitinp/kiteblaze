var express = require('express');
var router = express.Router();
var async = require('async');
var uniqid = require('uniqid'); // Help generate unique Ids
var fs = require('fs');
var git = require("nodegit");
var appModel = require('../models/appModel');

// Parent folder to host projects
var dir = './repos/';


module.exports = function(io) {

	router.all('*', function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/#loginforce');
	});

	/* GET about page. */
	router.get('/', function(req, res, next) {

		res.render('deploy', { title: 'Kiteblaze | Deploy apps automatically', page: 'about' });
		return;
	});

	router.post('/code', function(req, res, next) {

		var gitRepoLink = req.body.repolink;
		io.emit("logs", "Git repo link: " + gitRepoLink);

		// using promize


		// Use Async Series
		async.waterfall([
			// Generate name for user repo folder
			function(callback) {

				var uniqFolderName = uniqid('user-'); 

				io.emit("logs", "Generating folder with name " + uniqFolderName);
				callback(null, uniqFolderName);
			},

			// Create directory
			function(uniqFolderName, callback) {

				var projectFolder = dir + uniqFolderName;

				if (!fs.existsSync(projectFolder)){
 				   fs.mkdirSync(projectFolder);
				}

				io.emit("logs", "Created folder with name " + uniqFolderName);
				callback(null, uniqFolderName);
			},

			// Clone code from Github
			function(uniqFolderName, callback) {

				git.Clone("https://github.com/nodegit/nodegit", dir + uniqFolderName)
					.then(function(repo) {
						console.log('Cloning really done');		
						io.emit("logs", "Repo cloned successfully");		
						callback(null, uniqFolderName);		
					});

				io.emit("logs", "Repo cloning in process");
			},

			// Store folder name & Git Repo URL in Database
			function(uniqFolderName, callback) {

				// Store Model
				var newRepo = new appModel();
				newRepo.application.folderName = uniqFolderName;
				newRepo.application.gitRepoLink = gitRepoLink;

				// Save appModel. 
				// work in progress. Need to fix the Form & associated Javascript to 
				// send values correct. Also need to enforce user login
				newRepo.save(function(err) {
                    if (err)
                        throw err;
                    console.log("App Model saved successful");
                    return done(null, newUser);
                });

				io.emit("logs", "Local records updated");
				callback(null, uniqFolderName);
			},

			// Check if code cloned is correct
			function(callback) {
				io.emit("logs", "Repo cloned successfully");
				callback();
			},

			], function(err) {
			if(err)
				return next(err);

			console.log("Serial done");

			// Send confirmation for success
			io.emit("logs", "Click next and configure DB");

			// Enable next button on Webpage
		});
		
		res.send('done');
		return;
	})

	return router;
}