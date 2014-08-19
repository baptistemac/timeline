var TimeLine = (function(timeline) {

  timeline.Views.CategoryView = Backbone.View.extend({

    el: "#cat-5",

    // Variables disponibles :
    //cat : json de la catégorie

    initialize: function( cat ) {

      console.log("CategoryView initialize");

      this.cat = cat;
      this.template = $("#category_template").html();
      $("#categories").append('<div id="cat-'+this.cat.id+'"><a href="#" class="event">salut</a></div>');
      //this.el = "#cat-"+this.cat.id;

      this.render();

    },

    render: function() {
      console.log("CategoryView render", this.cat);

      //this.calcul_pos();

      var renderedContent = Mustache.to_html( this.template , this.cat );
      //this.$el.addClass("categories-"+mainView.tl.categories.length);
      this.$el.html(renderedContent);

    },


    // Calcul de la position de chaque event (left et prct).
    // On attribu ensuite les valeurs directement dans le json.
    calcul_pos: function () {
      console.log("calcul_left");

      var that = this;
      var settings = mainView.tl.settings;

      _.each( mainView.tl.categories, function( categories ){
        console.log("categories", categories.name);
        _.each( categories.events, function( event ){
          console.log("- events", event);

          // Calcul left
          var e_start = ( event.date && event.date.start) || settings.date.start;
          var tl_start = settings.date.start;
          var days = mainView.calcul_duration_between_dates( tl_start, e_start );
          var left = days / 365 * settings.echelle_1an;
          console.log("days", days, "left", left );
          event.left = left;

          // Calcul prct
          event.prct = ( left / that.tl_width ) * 100 ;
          console.log("prct", event.prct);

        });
      });
    },


    events : {
      "click .event"            : "click_event",
      "click .add_complement"   : "add_complement"
    },


    click_event: function (e) {
      console.log("click_event", this.cat);
      var curr = e.currentTarget;
      var id = parseInt( $(curr).data("id") );

      this.add_active_class( id, e );
      
      mainView.ficheView.open_fiche( id );
      
      this.check_complement( curr );
    
    },

    add_active_class: function ( id, e ) {
      // Cette fonction peut être appelée à partir de click_event (si l'event à été cliqué. Alors e existe).
      // Elle peut aussi être appelée de FicheView (la fiche à été appelé autrement).
      $(this.el).find(".event.active").removeClass("active");
      ( e ) ? $(e.currentTarget).addClass("active") : $(this.el).find(".event[data-id="+id+"]").addClass("active");
      mainView.mapView.active_id( id );
    }


  });
  return timeline;
}(TimeLine));