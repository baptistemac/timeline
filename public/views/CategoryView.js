var TimeLine = (function(timeline) {

  timeline.Views.CategoryView = Backbone.View.extend({


    initialize: function( options ) {

      console.log("CategoryView initialize", options);

      this.template       = $("#category_template").html();
      this.parent         = options.parent;
      this.id             = options.model.id;
      this.name           = options.model.name;
      this.eventslist     = options.model.events;
      this.complements    = options.model.complements;
      this.pos            = options.model.pos;

      // Définition de la position (left, prct, width) de chaque events
      this.calcul_events_positions( this.eventslist );

      
      var i;
      if ( this.complements && this.complements.length ) {
        for ( i=0 ; i<this.complements.length ; i++ ) {
          this.getComplement( this.complements[i].id , this.complements[i] );
        }
      }

      /* FORMAT de complements :
      this.complements = [
        { "id": 0 , "events": [ {} , {}] },
        { "id": 0 , "events": [ {} , {}] }
      ];
      */

    },

    render: function() {
      console.log("CategoryView render", this.model);
      
      var renderedContent = Mustache.to_html( this.template , this.model );
      this.$el.html( renderedContent );
      this.delegateEvents();

    },


    events : {
      "click .event"            : "click_event",
      "click .add_complement"   : "add_complement"
    },


    click_event: function (e) {
      console.log("click_event", e, this.id);
      var curr = e.currentTarget;
      var id = parseInt( $(curr).data("id") );

      // Si cette fiche est déjà ouverte, on la referme
      if ( mainView.ficheView.is_open && mainView.ficheView.id == id ) {
        mainView.ficheView.close_fiche();
      } else {
        // sinon on l'ouvre
        this.add_event_class( id, e );
        mainView.ficheView.open_fiche( id , false );
        this.add_category_class();
        mainView.mapView.active_id( id ); 
      }

    },

    add_event_class: function ( id, e ) {
      // Cette fonction peut être appelée à partir de click_event (si l'event à été cliqué. Alors e existe).
      // Elle peut aussi être appelée de FicheView (la fiche à été appelé autrement).
      this.$el.siblings(".active").andSelf().find(".event.active").removeClass("active");
      ( e ) ? $(e.currentTarget).addClass("active") : this.$el.find(".event[data-id="+id+"]").addClass("active");
    },

    add_category_class: function () {
      this.$el.addClass("active").siblings(".active").removeClass("active");
    },

    add_complement: function () {
      console.log("add_complement");
      if ( this.complements && this.complements.length ) {
        console.log(this.complements.length, this.complements);
        var complement = new TimeLine.Views.ComplementsView( { id: this.complements[0].id } );
      }
    },


    // Calcul de la position de chaque event (left et prct).
    // On attribu ensuite les valeurs directement dans le json.
    calcul_events_positions: function ( events ) {
      console.log("calcul_events_positions", events);
      
      //var that = this;
      var settings = mainView.tl.settings;
      var i;

      for ( i=0 ; i<events.length ; i++ ) {
        console.log("- event :", events[i]);

        var e = events[i];
        // calcul left
        // La distance entre le début de la timeline et le début de l'event.
        var e_start     = ( e.date && e.date.start) || settings.date.start;
        var tl_start    = settings.date.start;
        var days_before = this.parent.calcul_duration_between_dates( tl_start, e_start );
        var years_before = days_before / 365;
        var left        = Math.round( years_before * settings.scale_1year_in_px );
        e.left          = left;
        console.log("- event -- e_start", e_start, "tl_start", tl_start,"days_before", days_before, "years_before", years_before, "left", left );


        // calcul prct
        // La distance left mais en pourcentage par rapport à la largeur total de la timeline.
        // Utile pour ne pas recalculer les left dans #map
        var prct        = Math.round( ( left / this.parent.width ) * 100 );
        e.prct          = prct;

        // calcul width
        // si c'est une période
        var e_end       = ( e.date && e.date.end );
        var duree_days  = this.parent.calcul_duration_between_dates( e_start, e_end );
        var duree_years = duree_days / 365;
        var width       = Math.round( duree_years * settings.scale_1year_in_px );
        e.width         = width;

        console.log("left", e.left, "e.prct", e.prct,"duree_years", duree_years, "e.width", e.width );

      }

    },



    // Compléments

    getComplement: function ( id , complements ) {
      console.log("getComplement", id);
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/complements/'+id,
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
          var error = { "title":"Oops. Un problème est survenu.", "message":"Impossible de récupèrer le complément "+id+"." };
          mainView.modalView.show_error( error );
        },
        success: function (comp) {
          console.log("comp", comp);
          complements.events = comp.events;
          complements.name = comp.name;
          complements.shortname = comp.shortname;
          that.calcul_events_positions( comp.events );

          that.render();
        }
      });
    }


  });
  return timeline;
}(TimeLine));