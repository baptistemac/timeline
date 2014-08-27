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
      "timeline/:id"  : "timeline",
      "*path"         : "root"
    },

    root: function() {
      console.log("root *");
      mainView.homeView.render();

      /*
      var that = this;
      this.collection.all().fetch({
        success: function(result) {
         mainView.render(result);
        }
      });
      */
    },

    timeline: function ( id ) {
      console.log("root timeline", id);
      mainView.homeView.hide();
      mainView.profilView.hide();
      mainView.tlView.getTimeline( id );
    },

    edit: function () {
      $("h1").html("Edit");
    },

    login: function () {
      console.log("root login");
    },

    hello: function() {
      $("h1").html("Hello World !!!");
    }

  });
  return timeline;
}(TimeLine));