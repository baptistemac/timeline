var TimeLine = (function(timeline) {

  timeline.Router.RoutesManager = Backbone.Router.extend({

    initialize: function(args) {
      Backbone.history.start( { pushState: true, root: '/' } );
      //this.collection = args.collection;
      //console.log("this.collection", this.collection);
    },

    routes: {
      "hello"         : "hello",
      "login"         : "login",
      "profil"        : "profil",
      "create"        : "create_timeline",

      ":id"           : "timeline",
      "edit"          : "edit",

      "*path"         : "root"
    },

    root: function() {
      console.log("root *");
      $("body").removeClass().addClass("page-home");

      mainView.profilView.hide();
      mainView.tlView.hide();

      mainView.headerView.render();
      mainView.homeView.render( { show: true } );

      /*
      var that = this;
      this.collection.all().fetch({
        success: function(result) {
         mainView.render(result);
        }
      });
      */
    },

    hello: function() {
      $("h1").html("Hello World !!!");
    },

    login: function () {
      console.log("root login");
    },

    profil: function () {
      console.log("root profil");
      $("body").removeClass().addClass("page-profil");
      mainView.homeView.hide();
      mainView.tlView.hide();

      mainView.headerView.render();
      mainView.profilView.render( { show: true } );

    },

    create_timeline : function () {
      console.log("root create_timeline");
      // A définir...
    },


    timeline: function ( id ) {
      console.log("root timeline", id);
      $("body").removeClass().addClass("page-timeline");

      //mainView.currentpage.setCurrentpage( "timeline" );
      
      mainView.tlView.getTimeline( id );

      mainView.homeView.hide();
      mainView.profilView.hide();

    },

    edit: function () {
      $("h1").html("Edit");
    }


  });
  return timeline;
}(TimeLine));