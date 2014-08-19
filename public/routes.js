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

    edit: function () {
      $("h1").html("Edit");
    },

    hello: function() {
      $("h1").html("Hello World !!!");
    }

  });
  return timeline;
}(TimeLine));