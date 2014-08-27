var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    el: "body",

    log: { is_logged: false },

    initialize: function() {

      console.log("MainView initialize");
      
      this.modalView        = new TimeLine.Views.ModalView();
      this.headerView       = new TimeLine.Views.HeaderView( { parent: this } );
      this.homeView         = new TimeLine.Views.HomeView( { parent: this } );
      this.profilView       = new TimeLine.Views.ProfilView();

      this.tlView           = new TimeLine.Views.TlView();


      // check if user is logged
      //this.log.is_logged = true;

      // catch 16 last timelines create
      this.timelines = [
        { "id": 0, "name": "Lorem ipsum dolor" },
        { "id": 1, "name": "Ipsum Aenean Consectetur" },
        { "id": 2, "name": "Risus Tristique Sem Sollicitudin" },
        { "id": 3, "name": "Ridiculus Mattis" },
        { "id": 4, "name": "Fusce Justo Egestas" },
        { "id": 5, "name": "Cras Pharetra Vestibulum Venenatis" },
        { "id": 6, "name": "Vestibulum Quam Egestas" },
        { "id": 7, "name": "Elit Euismod" },
        { "id": 8, "name": "Condimentum Egestas Tellus" },
        { "id": 9, "name": "Nullam" },
        { "id": 10, "name": "Tellus Malesuada" },
        { "id": 11, "name": "Pellentesque Tristique Fusce" },
        { "id": 12, "name": "Condimentum Fermentum" },
        { "id": 13, "name": "Dolor Pellentesque" },
        { "id": 14, "name": "Porta Vestibulum Magna" },
        { "id": 15, "name": "Cras Pharetra Vestibulum Venenatis" }

      ];

      this.render();

      // get json
      //this.getTimeline( 0 );

    },

    render: function () {

      console.log("MainView render");

      this.headerView.render();

    },


    /*

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
      this.handlecompView   = new TimeLine.Views.HandlecompView();



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
  */

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