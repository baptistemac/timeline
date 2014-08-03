var TimeLine = (function(timeline) {

  timeline.Router.RoutesManager = Backbone.Router.extend({

    initialize: function(args) {
      //this.collection = args.collection;
      //console.log("this.collection", this.collection);
    },

    routes: {
      "hello"         : "hello",
      "*path"         : "root"
    },

    root: function() {
      var that = this;
      console.log("Routes root");
      /*
      this.collection.all().fetch({
        success: function(result) {
         mainView.render(result);
        }
      });
      */
    },

    hello: function() {
      $("h1").html("Hello World !!!");
    }

  });
  return timeline;
}(TimeLine));