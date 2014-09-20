yepnope({
  load: {
    jquery            : 'libs/vendors/jquery-1.10.2.js',
    underscore        : 'libs/vendors/underscore.js',
    backbone          : 'libs/vendors/backbone.js',
    mustache          : 'libs/vendors/mustache.js',
    
    //NameSpace
    timeline          : 'TimeLine.js',
    
    //Models
    tl                : 'models/tl.js',
    log               : 'models/log.js',
    currentpage       : 'models/currentpage.js',
    event             : 'models/event.js',
    
    //Controllers
    mainview          : 'views/MainView.js',
    
    headerview        : 'views/HeaderView.js',
    modalview         : 'views/ModalView.js',
    
    homeview          : 'views/HomeView.js',
    profilview        : 'views/ProfilView.js',

    tlview            : 'views/TlView.js',
    tlcategoryview    : 'views/TlCategoryView.js',
    tlcomplementsview : 'views/TlComplementsView.js',
    tlmapview         : 'views/TlMapView.js',
    tlficheview       : 'views/TlFicheView.js',
    tlcompview        : 'views/TlCompView.js',
    //navview         : 'views/NavView.js',

    //Routes
    routes            : 'routes.js'

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