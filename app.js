/*--------------------------------------------
Déclaration des librairies
--------------------------------------------*/
var express = require('express');
var logfmt = require("logfmt");
var fs = require('fs');
var app = module.exports = express();

app.use(logfmt.requestLogger());



/*--------------------------------------------
Paramétrages de fonctionnement d'Express
--------------------------------------------*/
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser('ilovebackbone'));
app.use(express.session({
  secret: "ilovebackbone"
}));


Routes();

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});



function Routes() {
  
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

  // GET timeline
  app.get('/timeline/:id', function(req, res){
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
