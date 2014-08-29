var TimeLine = (function(timeline) {

  timeline.Views.TlView = Backbone.View.extend({

    el: "#tl",

    // Variables disponibles :
    // this.tl.years = nombre d'année de la timleine
    // this.tl.width = largeur en px


    initialize: function( tl ) {
      console.log("TlView initialize");
      this.template = $("#tl_template").html();

      //this.complementsView  = new TimeLine.Views.ComplementsView();
      this.mapView          = new TimeLine.Views.MapView();
      this.ficheView        = new TimeLine.Views.FicheView( { parent: this } );
      this.handlecompView   = new TimeLine.Views.HandlecompView();

      // model
      this.tl               = new TimeLine.Models.Tl();

    },


    getTimeline: function ( id ) {

      var that = this;
      $.ajax({
        type: 'GET',
        url: '/data/timeline/'+id,
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
          var error = { "title":"Oops. Un problème est survenu.", "message":"Impossible de récupèrer le fichier JSON." };
          window.mainView.modalView.show_error( error );
        },
        success: function (tl) {
          console.log("tl", tl);
          that.initialize_tl( tl );
        }
      });

    },


    detect_scroll: function () {
      console.log("TlView detect_scroll");

      /*
      // detect scroll
      window.is_scroll = false;
      _.bindAll(this, 'scroll'); // _.bindAll is very usefull to keep the context of this in the scroll function.
      $(window).bind("scroll", this.scroll);
      */
    },


    initialize_tl: function( tl ) {
      console.log("TlView initialize_tl");

      this.tl.set( "id", tl.settings.id );
      this.tl.set( "title", tl.settings.title );
      this.tl.set( "date", tl.settings.date );
      this.tl.set( "scale_1year_in_px", tl.settings.scale_1year_in_px );

      this.tl.set( "categories", tl.categories );

      console.log( "this.tl", this.tl.attributes );

      // Définiton principale de la timeline
      this.setup_timeline();

      // Render de la la vue Categories
      this.render_main();

      // Définiton du tableau contenant les subviews
      this.subviews_arr = [];

      // Pour chaque catégorie, on créer une subview
      var cat_length = this.tl.attributes.categories.length || 0;
      for ( var i = 0 ; i < cat_length ; i++ ) {
        var category = this.tl.attributes.categories[i];
        var categoryView = new TimeLine.Views.CategoryView( { el:"#cat-"+i , model:category, parent:this } );
        this.subviews_arr.push( categoryView );
      }

      // Ajout de la class pour déterminer les hauteurs des .category
      this.$el.addClass( "categories-"+cat_length );

      // Render de toutes les subviews
      this.render();
      this.$el.parent("#timeline").addClass("show");

    },


    setup_timeline: function ( s ) {
      console.log("TlView set_timeline");

      var s = this.tl.attributes;
      console.log("TlView set_timeline", s);

      // Définition de la longueur de #themes
      var days    = this.calcul_duration_between_dates( s.date.start, s.date.end );
      var years   = days / 365 ;
      var width   = Math.round( years * s.scale_1year_in_px );

      this.$el.css("width", width+"px");
      this.tl.set("years", years);
      this.tl.set("width", width);

      this.define_all_dates();

    },


    render_main: function () {
      console.log("CategoriesView render_main");

      // Render du template #categories,
      // contenant déjà les div.category pour acceuillir par la suite les subviews.
      var renderedContent = Mustache.to_html( this.template , this.tl.attributes );
      this.$el.html(renderedContent);
    },


    render: function() {
      
      console.log("TlView render");

      // Pour chaque catégorie/subview, on append et on render
      var cat_length = this.tl.attributes.categories.length || 0;
      for ( var i = 0 ; i < cat_length ; i++ ) {
        this.$el.append( this.subviews_arr[i].$el );
        this.subviews_arr[i].render();
      }

    },


    events : {
    },


    // Retourn une durée en jours
    calcul_duration_between_dates: function ( date1, date2 ) {
      var date1 = new Date(date1);
      var date2 = new Date(date2);
      var difference_ms = date2.getTime() - date1.getTime();
      // Set 1 day in milliseconds
      var ONE_DAY = 1000 * 60 * 60 * 24;
      return Math.round(difference_ms/ONE_DAY);
    },


    define_all_dates: function () {

      this.tl.set( "dates", [ 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980 ] );

    },

    hide: function () {
      console.log("TlView hide");
      this.$el.parent("#timeline").removeClass("show");
    }



  });
  return timeline;
}(TimeLine));