var TimeLine = (function(timeline) {

  timeline.Views.FicheView = Backbone.View.extend({

    el: $("#fiche"),

    initialize: function() {

      console.log("FicheView initialize");
      this.template = $("#fiche_template").html();
      this.render();

    },

    render: function() {

      console.log("FicheView render");
      var renderedContent = Mustache.to_html( this.template , {} );
      this.$el.html(renderedContent);

    },


    events : {

    }


  });
  return timeline;
}(TimeLine));