var TimeLine = (function(timeline) {

  timeline.Views.MapView = Backbone.View.extend({

    el: "#map",

    duree: 2000,

    initialize: function() {

      console.log("MapView initialize");
      this.template = $("#map_template").html();

    },

    render: function() {

      console.log("MapView render");
      var renderedContent = Mustache.to_html( this.template , mainView.tl );
      this.$el.html(renderedContent);

    },


    events : {
    },

    show: function () {
      $(this.el).addClass("show");
    },

    hide : function () {
      $(this.el).removeClass("show");
    },

    active_id: function ( id ) {
      $(this.el).find(".event.active").removeClass("active").end()
      .find('.event[data-id='+id+']').addClass("active");
    }

  });
  return timeline;
}(TimeLine));