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
      /*
      app.session.checkAuth({
          success: function(res){
              // If auth successful, render inside the page wrapper
              $('#content').html( self.currentView.render().$el);
          }, error: function(res){
              self.navigate("/", { trigger: true, replace: true });
          }
      });
    */
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

      // Show alert classes and hide after specified timeout
      TimeLine.showAlert = function(title, text, klass) {
          $("#header-alert").removeClass("alert-danger alert-warning alert-success alert-info");
          $("#header-alert").addClass(klass);
          $("#header-alert").html('<button class="close" data-dismiss="alert">×</button><strong>' + title + '</strong> ' + text);
          $("#header-alert").show('fast');
          setTimeout(function() {
              $("#header-alert").hide();
          }, 7000 );
      };

    });

  } // Fin de complete
});