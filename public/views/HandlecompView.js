var TimeLine = (function(timeline) {

  timeline.Views.HandlecompView = Backbone.View.extend({

    el: "#handlecomp",

    initialize: function() {

      console.log("Handlecomp initialize");
      this.template = $("#handlecomp_template").html();

    },

    render: function( comp ) {

      console.log("Handlecomp render", comp);
      var renderedContent = Mustache.to_html( this.template , comp );
      this.$el.html(renderedContent);

    },


    events : {
    },

    open: function ( comp ) {
      console.log("Handlecomp open. comp", comp);
      this.render( comp );
    }

  });
  return timeline;
}(TimeLine));