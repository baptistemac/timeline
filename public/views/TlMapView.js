var TimeLine = (function(timeline) {

  timeline.Views.MapView = Backbone.View.extend({

    el: "#map",

    duree: 3000,

    initialize: function() {

      console.log("MapView initialize");
      this.template = $("#map_template").html();
    },

    render: function() {

      console.log("MapView render",  mainView.tlView.tl.attributes );
      var renderedContent = Mustache.to_html( this.template , mainView.tlView.tl.attributes );
      this.$el.html(renderedContent);

      this.sigth = this.$el.find("> .sight");
      this.tl_width = mainView.tlView.tl.attributes.width;
      this.bind_scroll();

    },


    events : {
    },

    show: function () {
      this.$el.addClass("show");
    },

    hide : function () {
      this.$el.removeClass("show");
    },

    active_id: function ( id ) {
      this.$el.find(".event.active").removeClass("active").end()
      .find('.event[data-id='+id+']').addClass("active");
    },


    // Scroll

    bind_scroll: function () {
      console.log("TlMapView detect_scroll");

      // Define with of .sight
      this.sigth.width( mainView.tlView.tl.attributes.view_prct + "%" );
      window.is_scroll = false;
      _.bindAll(this, 'scroll'); // _.bindAll is very usefull to keep the context of this in the scroll function.
      $("#timeline").bind("scroll", this.scroll);
      
    },

    scroll: function() {
      console.log( "scrolling...");
      if ( !window.is_scroll ) {
        var that = this;
        window.setTimeout( function() { that.end_scroll(); }, this.duree );
        this.show();
        window.is_scroll = true;
      }
      var scrollLeft_prct = $("#timeline").scrollLeft() / this.tl_width * 100;
      this.sigth.css( "left", scrollLeft_prct + "%" );
    },

    end_scroll: function() {
      console.log("end_scroll");
      this.hide();
      window.is_scroll = false;
    },

  });
  return timeline;
}(TimeLine));