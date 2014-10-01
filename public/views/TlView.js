var TimeLine = (function(timeline) {

  timeline.Views.TlView = Backbone.View.extend({

    el: "#tl",

    // Variables disponibles :

    currentevent: false,
    // currentevent_id

    // this.tl.years = nombre d'année de la timleine
    // this.tl.width = largeur en px
    // this.tl.view_prct = largeur de la vue en pourcentage


    initialize: function( tl ) {
      console.log("TlView initialize", tl);
      this.template = $("#tl_template").html();

      //this.complementsView  = new TimeLine.Views.ComplementsView();
      this.mapView          = new TimeLine.Views.MapView();
      this.ficheView        = new TimeLine.Views.FicheView( { parent: this } );
      this.handlecompView   = new TimeLine.Views.HandlecompView();

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
          console.log("getTimeline tl", tl);
          that.initialize_tl( tl );
        }
      });

    },


    initialize_tl: function( tl ) {
      console.log("TlView initialize_tl", tl.settings.id);

      // model
      this.tl = new TimeLine.Models.Tl( tl );

      this.tl.attributes = tl;

      //if (tl.settings.id != undefined) this.tl.set( "id", tl.settings.id );
      //this.tl.set( "title", tl.settings.title );
      //this.tl.set( "date", tl.settings.date );
      //if (tl.settings.scale_1year_in_px) this.tl.set( "scale_1year_in_px", tl.settings.scale_1year_in_px );

      //this.tl.set( "categories", tl.categories || 0 );

      console.log( "this.tl", this.tl.attributes );

      // Mise à jour du Header avec le bon title et date..
      mainView.headerView.render();

      // Définiton principale de la timeline
      this.setup_timeline();

      // Render de la la vue Tl
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

      // Render de la map
      this.mapView.render();

    },


    setup_timeline: function ( s ) {
      var s = this.tl.attributes;
      console.log("TlView set_timeline");

      // Définition de la longueur de #themes
      var days    = this.calcul_duration_between_dates( s.settings.date.start, s.settings.date.end );
      var years   = days / 365 ;
      var width   = Math.round( years * s.settings.scale_1year_in_px );

      this.$el.css("width", width+"px");
      this.tl.attributes.settings.years = years;
      this.tl.attributes.settings.width = width;

      this.define_all_dates();

      // Définition du pourcentage de largeur entre le viewport et la timeline
      var view_prct = $(window).width() / width * 100;
      this.tl.attributes.settings.view_prct = view_prct;

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


    add_event: function () {
      console.log("add_event", this.tl.events);
      var new_event = new TimeLine.Models.Event();
      var u = _.max( this.tl.events, function(event) { console.log("-",event.id); return event.id; } );
      console.log("u", u);
      var id  = 18; //new_event.id;
      this.ficheView.open( id, { edit: true, add_class:false } );
    },


    nextEvent: function () {
      console.log("nextEvent");
      this.ficheView.open(9);
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