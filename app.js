/*--------------------------------------------
Déclaration des librairies
--------------------------------------------*/
var express = require('express'),
    http  = require('http'),
    config = require("./config"),
    nStore  = require('nstore'),
    logfmt = require("logfmt"),
    _ = require("underscore"),
    //infobox = require('wiki-infobox'),
    app     = module.exports = express();

    app.use(logfmt.requestLogger());
    nStore = nStore.extend(require('nstore/query')());

    server  = http.createServer(app).listen( process.env.PORT || config.port);


// Logging config
app.configure('local', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});


// Compression (gzip)
app.use( express.compress() );
app.use( express.methodOverride() );
app.use( express.urlencoded() );            // Needed to parse POST data sent as JSON payload
app.use( express.json() );


/*--------------------------------------------
Paramétrages de fonctionnement d'Express
--------------------------------------------*/

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser( config.cookieSecret ));
//app.use(express.session());

//app.use(express.cookieSession( config.sessionSecret ) );
app.use(express.session({
  secret: config.sessionSecret
}));



/*--------------------------------------------
Définition de la "base" users
--------------------------------------------*/
var users;
users = nStore.new("data/users/users.db", function() {
  Routes();
});



/*
// Cookie config
app.use( express.cookieParser( config.cookieSecret ) );           // populates req.signedCookies
app.use( express.cookieSession( config.sessionSecret ) );         // populates req.session, needed for CSRF
*/

/*
// We need serverside view templating to initially set the CSRF token in the <head> metadata
// Otherwise, the html could just be served statically from the public directory
app.set('view engine', 'html');
app.set('views', __dirname + '/views' );
app.engine('html', require('hbs').__express);

*/
//app.use(express.static(__dirname+'/public'));
//console.log("express.csrf()", app );
//app.use(express.csrf());


//app.use(app.router);


/*======= Authentification =======*/


var connectedUsers = [];

function addUser(user) {
  users.save(null, user, function(err, key) {
    if (err) {
      console.log("Erreur : ", err);
    } else {
      user.id = key;
      console.log(user);
      return user.id;
    }
  });
}

function findUserByMail(email) {
  // Permet de vérifier si un utilisateur est déjà loggé
  return connectedUsers.filter(function(user) {
    return user.email == email;
  })[0];
}

function findUserBySession(sessionID) {
  // Permet de retrouver un utilisateur par son id de session
  return connectedUsers.filter(function(user) {
    return user.sessionID == sessionID;
  })[0];
}

function findUserByUsername( username, callback ) {
  console.log("fct findUserByUsername", username);
  users.find({ username: username }, function (err, results) {
    // All the users are now in a single object.
    console.log("results", results );
    if ( Object.keys(results).length == 0 ) {
      if(callback && 'success' in callback ) callback.success(results);
    } else {
      // Ex: Ce username est deja pris.
      if(callback && 'error' in callback ) callback.error(results);
    }
  });
}



function Routes() {
  

  // GET /api/auth
  // @desc: checks a user's auth status based on cookie
  app.get("/api/auth", function(req, res){
    console.log("/api/auth");
    var user = findUserBySession(req.sessionID);
    console.log("user", user);
    if (user) {
      res.json({ user: _.omit(user, ['password', 'auth_token']) });
    } else {
      res.json({});
    }
  });

  // POST /api/auth/login
  // @desc: logs in a user
  app.post("/api/auth/login", function(req, res){
    console.log("POST /api/auth/login", req.body );

    var user = req.body;

    users.find({
      username: user.username,
      password: user.password
    },
    function(err, results) {
      console.log( "find", err, results );
      if (err) {
        res.json({ error: "Oops, Problème." });
      } else {

        //J'ai trouvé l'utilisateur
        var key = Object.keys(results)[0];
        var user = results[key];
        console.log("authenticatedUser", req.sessionID);
        //Je rajoute l'id de session à l'objet utilisateur

        user.key = key;
        user.sessionID = req.sessionID;

        //Ajouter l'utilisateur authentifié à la liste des utilisateurs connectés
        connectedUsers.push(user);
        console.log("connectedUsers", connectedUsers);
        res.json({ user: _.omit(user, ['password', 'auth_token']) });

      }
    });


    /*
      db.get("SELECT * FROM users WHERE username = ?", [ req.body.username ], function(err, user){
          if(user){

              // Compare the POSTed password with the encrypted db password
              if( bcrypt.compareSync( req.body.password, user.password)){
                  res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
                  res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });

                  // Correct credentials, return the user object
                  res.json({ user: _.omit(user, ['password', 'auth_token']) });   

              } else {
                  // Username did not match password given
                  res.json({ error: "Invalid username or password."  });   
              }
          } else {
              // Could not find the username
              res.json({ error: "Username does not exist."  });   
          }
      });
      */
  });

  // POST /api/auth/signup
  // @desc: creates a user
  app.post("/api/auth/signup", function(req, res){
      console.log("POST /api/auth/signup", req.body.username, req.body.password);
      
      var user = req.body;
      
      // Check if username is not already taken
      findUserByUsername( user.username, {
        error: function() {
          console.log("Username has been taken.");
          res.json({ error: "Username has been taken.", field: "username" }); 
        },
        success: function() {
          console.log("ADD new user");
          user.id = addUser(user);

          user.sessionID = req.sessionID;

          //Ajouter l'utilisateur authentifié à la liste des utilisateurs connectés
          connectedUsers.push(user);

          // Set the user cookies and return the cleansed user data
          //Todo: signed cookie
          //res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
          //res.cookie('user_id', user.id, { maxAge: config.cookieMaxAge }); 
          res.json({ user: _.omit(user, ['password', 'auth_token']) });
        }
      });

      /*
      db.serialize(function(){
          db.run("INSERT INTO users(username, name, password, auth_token) VALUES (?, ?, ?, ?)", 
                  [ req.body.username, req.body.name, bcrypt.hashSync(req.body.password, 8), bcrypt.genSaltSync(8) ], function(err, rows){
              if(err){
                  res.json({ error: "Username has been taken.", field: "username" }); 
              } else {

                  // Retrieve the inserted user data
                  db.get("SELECT * FROM users WHERE username = ?", [ req.body.username ], function(err, user){
                      if(!user) {
                          console.log(err, rows);
                          res.json({ error: "Error while trying to register user." }); 
                      } else {

                          // Set the user cookies and return the cleansed user data
                          res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
                          res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });
                          res.json({ user: _.omit(user, ['password', 'auth_token']) });   
                      }
                  });
              }
          });
      });
*/
  });


  // POST /api/auth/logout
  // @desc: logs out a user, clearing the signed cookies
  app.post("/api/auth/logout", function(req, res){
      console.log("POST /api/auth/logout");

      var user = findUserBySession(req.sessionID);
      if (user) {
        //Je l'ai trouvé, je le supprime de la liste des utilisateurs connectés
        var posInArray = connectedUsers.indexOf(user);
        connectedUsers.splice(posInArray, 1);
        res.json({ success: "User successfully logged out." });
      } else {
        res.json({});
      }
      //res.clearCookie('user_id');
      //res.clearCookie('auth_token');
  });

  // POST /api/auth/remove_account
  // @desc: deletes a user
  app.post("/api/auth/remove_account", function(req, res){
      db.run("DELETE FROM users WHERE id = ? AND auth_token = ?", [ req.signedCookies.user_id, req.signedCookies.auth_token ], function(err, rows){
          if(err){ 
              res.json({ error: "Error while trying to delete user." }); 
          } else {
              res.clearCookie('user_id');
              res.clearCookie('auth_token');
              res.json({ success: "User successfully deleted." });
          }
      });
  });


  // Close the db connection on process exit 
  // (should already happen, but to be safe)
  process.on("exit", function(){
      db.close();
  });





  // Défintion des variables utiles
  var timeline_folder   = "./data/timeline";
  var complement_folder = "./data/complement";

  //var jsonfile = "./data/data.json";
  var backupfile = "./data/backup/data_"+get_today()+".json";
  
  /*
  // POST screens
  app.post('/data', function(req, res){
    console.log("post");

    var json = req.body;
    var json = JSON.stringify( json, null, '\t' );
    
    // Écriture du data.json
    fs.writeFile( jsonfile, json, function(err) {
      if (err) throw err;
      console.log('[Great!] Le fichier '+jsonfile+' a bien été mis à jour.');
    });

    // Écriture du /backup/data_{date}.json
    fs.writeFile( backupfile, json, function(err) {
      if (err) throw err;
      console.log('[Great!] Le fichier de backup '+backupfile+' a bien été mis à jour.');
    });

    res.json(json);

  });
  */

  app.get('/profil', function(req, res){
    res.sendfile( __dirname + '/public/index.html' );
  });

  app.get('/0', function(req, res){
    res.sendfile( __dirname + '/public/index.html' );
  });

  // GET timeline
  app.get('/data/timeline/:id', function(req, res){
    var id = req.params.id;
    console.log("get data", timeline_folder, id );
    var data = {};
    fs.readFile( timeline_folder+"/"+id+".json", "utf8", function (err, data) {
      if (err) throw err;
      data = JSON.parse(data);
      console.log("data", data);
      res.json(data);
    });
    
  });

  // GET complements
  app.get('/complements/:id', function(req, res){
    var id = req.params.id;
    console.log("get data", complement_folder, id );
    var data = {};
    fs.readFile( complement_folder+"/"+id+".json", "utf8", function (err, data) {
      if (err) throw err;
      data = JSON.parse(data);
      console.log("data", data);
      res.json(data);
    });
    
  });




  app.get('/wiki', function(req, res){

    var data = {};
    var page = req.params.page;
    var language = req.params.language;

    //var page = 'Ronald Reagan';
    //var language = 'en';

    infobox(page, language, function(err, data){
      if (err) {
        // Oh no! Something goes wrong!
        return;
      }
      console.log(data);
      res.json(data);
    });
  });

  
  // Fontions utiles

  function get_today () {
    var today    = new Date();
    var dd       = today.getDate();
    var mm       = today.getMonth()+1; //January is 0!`
    var yyyy     = today.getFullYear();
    if( dd<10 ) { dd = '0'+dd }
    if( mm<10 ) { mm = '0'+mm }
    return yyyy+"-"+mm+"-"+dd;
  }


}


console.log("STARTUP:: Express server listening on port::", server.address().port, ", environment:: ", app.settings.env);
