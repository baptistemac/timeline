var TimeLine = (function(timeline) {

  timeline.Router.RoutesManager = Backbone.Router.extend({

    initialize: function(args) {
      Backbone.history.start( { pushState: true } );
    },

    routes: {
      "admin/screens"         : "screens",
      "*path"                 : "root"
    },

    root: function() {
      console.log("Routes root");
      // Par défaut, on affiche screens
      this.navigate('admin/screens', true);
    }

  });
  return timeline;
}(TimeLine));