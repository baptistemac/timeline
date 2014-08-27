var TimeLine = (function(timeline) {

  timeline.Views.NavView = Backbone.View.extend({

    el: $("#nav"),

    initialize: function() {

      console.log("NavView initialize");
      this.template = $("#nav_template").html();
      this.render();

    },

    render: function() {

      console.log("NavView render");
      var renderedContent = Mustache.to_html( this.template , {} );
      this.$el.html(renderedContent);

    },


    events : {
    },

    toggle : function (e) {
      if (e) { e.preventDefault(); }
      $(".container").toggleClass("nav");
    }

  });
  return timeline;
}(TimeLine));