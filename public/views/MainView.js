var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    el: "body",

    curr_page: "home",
    
    map_display_duration: 2000, // a mettre dans TlMapView à terme.


    initialize: function() {

      console.log("MainView initialize");
      
      // Initialize Models
      this.log              = new TimeLine.Models.Log();

      // Initialize Views
      this.modalView        = new TimeLine.Views.ModalView();
      this.headerView       = new TimeLine.Views.HeaderView( { parent: this } );
      this.homeView         = new TimeLine.Views.HomeView( { parent: this } );
      this.profilView       = new TimeLine.Views.ProfilView();
      this.tlView           = new TimeLine.Views.TlView();

      // check if user is logged
      //this.log.is_logged = true;

      // detect scroll
      window.is_scroll = false;
      _.bindAll(this, 'scroll'); // _.bindAll is very usefull to keep the context of this in the scroll function.
      $(window).bind("scroll", this.scroll);

      // render
      this.render();

    },

    render: function () {

      console.log("MainView render");

    },


    events : {},

    scroll: function() {
      console.log( "scrolling...");
      if ( !window.is_scroll ) {
        window.setTimeout(this.end_scroll, this.map_display_duration);
        //this.mapView.show();
        window.is_scroll = true;
      }
    },

    end_scroll: function() {
      console.log("end_scroll");
      //mainView.mapView.hide();
      window.is_scroll = false;
    }

  });
  return timeline;
}(TimeLine));