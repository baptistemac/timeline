var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    el: "body",

    initialize: function() {

      console.log("MainView initialize");
      
      this.modalView  = new TimeLine.Views.ModalView();

      // get json
      this.getTimeline( 0 );

    },


    getTimeline: function ( id ) {

      var that = this;
      $.ajax({
        type: 'GET',
        url: '/timeline/'+id,
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
          var error = { "title":"Oops. Un problème est survenu.", "message":"Impossible de récupèrer le fichier JSON." };
          that.modalView.show_error( error );
        },
        success: function (tl) {
          console.log("tl", tl);
          that.tl = tl;
          that.instantiation();
          that.render();
        }
      });

    },

    instantiation: function () {
      console.log("MainView initialize2");

      this.headerView       = new TimeLine.Views.HeaderView();
      this.navView          = new TimeLine.Views.NavView();
      this.categoriesView   = new TimeLine.Views.CategoriesView();
      //this.complementsView  = new TimeLine.Views.ComplementsView();
      this.mapView          = new TimeLine.Views.MapView();
      this.ficheView        = new TimeLine.Views.FicheView();

      // detect scroll
      window.is_scroll = false;
      _.bindAll(this, 'scroll'); // _.bindAll is very usefull to keep the context of this in the scroll function.
      $(window).bind("scroll", this.scroll);

    },

    render: function() {
      console.log("MainView render", this.tl);

      // Render du header (dont titre et date)
      this.headerView.render();

      // Render du themes (les calcul des positions des events se font ici)
      this.categoriesView.render();

      // Render de la map
      this.mapView.render();

      // launch fiche
      //this.ficheView.open_fiche( 0 , true );

    },


    events : {
    },


    scroll: function() {
      console.log( "scrolling...");
      if ( !window.is_scroll ) {
        window.setTimeout(this.end_scroll, this.mapView.duree);
        this.mapView.show();
        window.is_scroll = true;
      }
    },

    end_scroll: function() {
      console.log("end_scroll");
      mainView.mapView.hide();
      window.is_scroll = false;
    }

  });
  return timeline;
}(TimeLine));