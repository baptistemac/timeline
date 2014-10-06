/*--------------------------------------------
Déclaration des librairies
--------------------------------------------*/

var config    = require("./config");

var express   = require('express'),
    http      = require('http'),
    fs        = require("fs"),
    //nStore    = require('nstore'),
    //nStore    = nStore.extend(require('nstore/query')());
    mongoose  = require('mongoose'),
    logfmt    = require("logfmt"),
    _         = require("underscore"),
    //infobox = require('wiki-infobox'),
    app       = module.exports = express();



/*--------------------------------------------
Middlewares and configurations
--------------------------------------------*/

app.use(logfmt.requestLogger());

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

// Paramétrages de fonctionnement d'Express
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser( config.cookieSecret ));
//app.use(express.session());
//app.use(express.cookieSession( config.sessionSecret ) );
app.use(express.session({
  secret: config.sessionSecret
}));



/*--------------------------------------------
Database and Models
--------------------------------------------*/ 

//mongoose.connect('mongodb://baptiste:baptiste@localhost:27017/uw15dfpu');
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { });


var UserSchema = new mongoose.Schema({
    username: String,
    password: {type: String, select: false},
    email: String,
    timelines: Array,
    first_connexion: Date,
    last_connexion: Date
});
var User = mongoose.model('users', UserSchema);


var EventSchema = new mongoose.Schema({
    title: String,
    date: {
      start: String,
      end: String
    },
    type: String
});
var Event = mongoose.model('events', EventSchema);


var TimelineSchema = new mongoose.Schema({
    title: String,
    date: {
      start: String,
      end: String
    },
    categories: Array,
    creation_date: Date,
    scale_1year_in_px: Number,
    creator_id: String
});
var Timeline = mongoose.model('timelines', TimelineSchema);


Routes();



/*======= Authentification =======*/


var connectedUsers = [];

/*
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
*/
function findUserBySession(sessionID) {
    // Permet de retrouver un utilisateur par son id de session
    return connectedUsers.filter(function(user) {
        return user.sessionID == sessionID;
    })[0];
}



function Routes() {
  

  // Check if user is already connected

  app.get("/api/auth", function(req, res){
      console.log("/api/auth");

      // Get user
      var user_data = findUserBySession(req.sessionID);
      console.log("user_data", user_data);

      if (user_data) {

          // Save user with last_connexion property
          User.findOne({'_id': user_data.id}, 'username id', function (err, result) {
              result.last_connexion = get_timestamp();
              result.save();
          });

          // Send
          res.json({ user: user_data });

      } else {
          res.json({});
      }

  });

  

  // Login

  app.post("/api/auth/login", function(req, res){
    console.log("POST /api/auth/login", req.body );

    var user_data = req.body;
    
    // Check if username/password is correct
    User.findOne({ 'username': user_data.username , 'password': user_data.password }, 'username email timelines last_connexion first_connexion', function (err, result) {
      console.log("result", result);

      if (err) { console.error("Erreur lors de la recherche du user courant."); } 
      if (!result) { res.json({ error: "Le nom d'utilisateur ou le mot de passe est incorrect." }); }
      if (result) {

        // Save user with last_connexion property
        result.last_connexion = get_timestamp();
        result.save();

        // Keep
        result.sessionID = req.sessionID;
        connectedUsers.push(result);
        console.log("connectedUsers", connectedUsers);

        // Send
        res.json({ user: result });
      }
    }); 

  });



  // Sign in

  app.post("/api/auth/signup", function(req, res){
      console.log("POST /api/auth/signup", req.body.username, req.body.password);
      
      var user_data = req.body;
      
      // Check if this username already exist
      User.findOne({ 'username': user_data.username }, 'username', function (err, result) {
          if (err) { return handleError(err); }
          else if (!result) {

              // Create user
              //user_data.timelines = [0];
              user_data.first_connexion = get_timestamp();
              user_data.last_connexion  = get_timestamp();
              var user = new User( user_data );

              // Save user
              user.save(function (err, data) {
                  if (err) return console.error(err);
                  console.log("New user created", data);
              });

              // Keep
              user_data.sessionID = req.sessionID;
              connectedUsers.push(user_data);

              // Send
              res.json({ user: user });

          } else {
              console.log("Username has been taken.");
              res.json({ error: "Username has been taken.", field: "username" }); 
          }

      })

  });

  

  // Log out

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



  // Remove account

  app.post("/api/auth/remove_account", function(req, res){
    
    var user_data = req.body;
    console.log( "remove_account", user_data );

    // Retrieve user and delete it
    User.findByIdAndRemove( user_data._id, function(err, result){
      if (err) { res.json({ error: "Error while trying to delete user." }); }
      if(result) {
        console.log("result", result);

        // Todo : Supprression des timelines associées
        // Todo : Supression de la session et des cookie

        // Send
        res.json({ success: "User successfully deleted." });
      }
    });

  });



  // Save

  app.post("/api/auth/save", function(req, res){
    console.log("POST /api/auth/save" );
    
    var user_data = req.body;

    // Check if username/password is correct
    User.findOne({ 'username': user_data.username }, 'username email timelines', function (err, result) {
      if (err) { console.error("Erreur lors de la recherche du user courant."); } 
      if (result) {
        // Save user with new properties
        _.extend( result, user_data );
        //console.log("result", result);
        result.save();
      }
    });

  });




  // Get a timeline

  app.get("/api/timeline/:id", function(req, res){

  });



  // Save a timeline

  app.post("/api/timeline/create", function(req, res){
    console.log("Save timeline", req.body);

    // Create 
    var timeline = new Timeline( req.body );

    // Save user
    timeline.save(function (err, data) {
        if (err) return console.error(err);
        console.log("New timeline created", data);
    });

    // Send
    res.json( timeline );

  });



  // Save a category

  app.post("/api/category/:id", function(req, res){

  });



  // Save an event

  app.post("/api/event/:id", function(req, res){

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
  /*
  app.get('*', function(req, res){
    res.sendfile( __dirname + '/public/index.html' );
  });
  */

  app.get('/profil', function(req, res){
    res.sendfile( __dirname + '/public/index.html' );
  });

  app.get('/0', function(req, res){
    res.sendfile( __dirname + '/public/index.html' );
  });

  app.get('/:user/timelines', function(req, res){
    res.json( { "timelines": [ { "id":0 , "title":"wqkjdkqjd" } , { "id":8 , "title":"pokljlkjkljkj" } ] } );
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

}


/*--------------------------------------------
Fonctions utiles
--------------------------------------------*/

function get_today () {
  var today    = new Date();
  var dd       = today.getDate();
  var mm       = today.getMonth()+1; //January is 0!`
  var yyyy     = today.getFullYear();
  if( dd<10 ) { dd = '0'+dd }
  if( mm<10 ) { mm = '0'+mm }
  return yyyy+"-"+mm+"-"+dd;
}

function get_timestamp () {
  return new Date();
}



console.log("STARTUP:: Express server listening on port::", server.address().port, ", environment:: ", app.settings.env);
