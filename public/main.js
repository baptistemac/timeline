yepnope({
  load: {

    jquery            : 'libs/vendors/jquery-1.10.2.js',
    underscore        : 'libs/vendors/underscore.js',
    backbone          : 'libs/vendors/backbone.js',
    mustache          : 'libs/vendors/mustache.js',
    parsley           : 'libs/vendors/parsley.js',

    //NameSpace
    timeline          : 'TimeLine.js',
    
    //Models
    session           : 'models/SessionModel.js',
    user              : 'models/UserModel.js',
    tl                : 'models/tl.js',
    currentpage       : 'models/currentpage.js',
    event             : 'models/event.js',
    
    //Controllers
    mainview          : 'views/MainView.js',
    
    headerview        : 'views/HeaderView.js',
    loginview         : 'views/LoginView.js',
    modalview         : 'views/ModalView.js',
    createtlview      : 'views/CreateTlView.js',
    
    homeview          : 'views/HomeView.js',
    profilview        : 'views/ProfilView.js',

    tlview            : 'views/TlView.js',
    tlcategoryview    : 'views/TlCategoryView.js',
    tlcomplementsview : 'views/TlComplementsView.js',
    tlmapview         : 'views/TlMapView.js',
    tlficheview       : 'views/TlFicheView.js',
    tlcompview        : 'views/TlCompView.js',

    //Routes
    routes            : 'routes.js'

  },

  callback: {},

  complete: function() {
    $(function() {

      console.log("Check out the code at [...]");
      console.log("Lauching application ...");

      DEBUG = true;

      TimeLine.API = "/api";

      // Create a new session model and scope it to the app global
      // This will be a singleton, which other modules can access
      TimeLine.session = new TimeLine.Models.SessionModel({ });

      // Check the auth status upon initialization,
      // before rendering anything or matching routes
      TimeLine.session.checkAuth({

          // Start the backbone routing once we have captured a user's auth status
          complete: function(){

              //window.itemscollection = new KeyGame.Collections.Items();
              
              window.mainView = new TimeLine.Views.MainView();
              
              window.router   = new TimeLine.Router.RoutesManager({
              //collection: itemscollection
              });

          }
      });


      TimeLine.get_today = function() {
        console.log("get_today");
        var today    = new Date();
        var dd       = today.getDate();
        var mm       = today.getMonth()+1; //January is 0!`
        var yyyy     = today.getFullYear();
        if( dd<10 ) { dd = '0'+dd }
        if( mm<10 ) { mm = '0'+mm }
        return yyyy+"-"+mm+"-"+dd;
      }

    });

    // Fontions utiles



  } // Fin de complete
});