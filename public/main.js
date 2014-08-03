yepnope({
  load: {
    jquery:       'libs/vendors/jquery-1.10.2.js',
    underscore:   'libs/vendors/underscore.js',
    backbone:     'libs/vendors/backbone.js',
    mustache:     'libs/vendors/mustache.js',
    
    //NameSpace
    timeline:      'TimeLine.js',
    
    //Models
    //objets        : 'models/objects.js',
    
    //Controllers
    mainview      : 'views/MainView.js',
    colsview      : 'views/ThemesView.js',
    ficheview     : 'views/FicheView.js',
    
    //Routes
    routes        : 'routes.js'

  },

  callback: {},

  complete: function() {
    $(function() {

      console.log("Check out the code at [...]");
      console.log("Lauching application ...");

      //window.itemscollection = new KeyGame.Collections.Items();
      
      window.mainView = new TimeLine.Views.MainView();
      
      window.router   = new TimeLine.Router.RoutesManager({
      //collection: itemscollection
      });

      Backbone.history.start();


    });

  } // Fin de complete
});