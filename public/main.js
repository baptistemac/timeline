yepnope({
  load: {
    jquery          : 'libs/vendors/jquery-1.10.2.js',
    underscore      : 'libs/vendors/underscore.js',
    backbone        : 'libs/vendors/backbone.js',
    mustache        : 'libs/vendors/mustache.js',
    
    //NameSpace
    timeline        : 'TimeLine.js',
    
    //Models
    tl              : 'models/tl.js',
    
    //Controllers
    mainview        : 'views/MainView.js',
    headerview      : 'views/HeaderView.js',
    modalview       : 'views/ModalView.js',
    homeview        : 'views/HomeView.js',
    profilview      : 'views/ProfilView.js',
    tlview          : 'views/TlView.js',

    navview         : 'views/NavView.js',
    categoryview    : 'views/CategoryView.js',
    complementsview : 'views/ComplementsView.js',
    mapview         : 'views/MapView.js',
    ficheview       : 'views/FicheView.js',
    handlecompview  : 'views/HandlecompView.js',
    
    //Routes
    routes          : 'routes.js'

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

    });

  } // Fin de complete
});