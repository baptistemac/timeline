var TimeLine = (function(timeline) {

  timeline.Router.RoutesManager = Backbone.Router.extend({

    initialize: function(args) {
      Backbone.history.start( { pushState: true } );
      //this.collection = args.collection;
      //console.log("this.collection", this.collection);
    },

    routes: {
      "edit"          : "edit",
      "hello"         : "hello",
      "login"         : "login",
      "profil"        : "profil",
      "timeline/:id"  : "timeline",
      "*path"         : "root"
    },

    root: function() {
      console.log("root *");
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

    edit: function () {
      $("h1").html("Edit");
    },

    hello: function() {
      $("h1").html("Hello World !!!");
    },

    login: function () {
      console.log("root login");
    },

    profil: function () {
      console.log("root profil");
      mainView.homeView.hide();
      mainView.tlView.hide();

      mainView.headerView.render();
      mainView.profilView.render( { show: true } );

    },

    timeline: function ( id ) {
      console.log("root timeline", id);
      
      mainView.curr_page = "timeline";

      mainView.homeView.hide();
      mainView.profilView.hide();

      mainView.headerView.render();
      mainView.tlView.getTimeline( id );
    }


  });
  return timeline;
}(TimeLine));