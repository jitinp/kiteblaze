// Model for Code Repo. Stores Folder path, Git Repo link, user app-DB details and any additional info
var mongoose = require('mongoose');


var application = mongoose.Schema({
	name        : String,
    folderName     : String,
    gitRepoLink     : String,
    lastUpdated     : String,
    created_at: { type: Date, default: Date.now },
    changed_at: { type: Date, default: Date.now }
});

var db = mongoose.Schema({
	name: String,
    type: String,
    host: String,
    username: String,
    password: String,
    port: String,
    created_at: { type: Date, default: Date.now },
    changed_at: { type: Date, default: Date.now }
})

// define the schema for our user model
var repoSchema = mongoose.Schema({

    projectName: String,
    applications: [application],
    dbs: [db],
    created_at: { type: Date, default: Date.now },
    changed_at: { type: Date, default: Date.now }
});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('deployRepoModel', repoSchema);