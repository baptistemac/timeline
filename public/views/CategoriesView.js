var TimeLine = (function(timeline) {

  timeline.Views.CategoriesView = Backbone.View.extend({

    el: "#categories",

    // Variables disponibles :
    // this.tl_years = nombre d'année de la timleine
    // this.tl_width = largeur en px

    initialize: function() {

      console.log("CategoriesView initialize");
      //this.render();
      //this.template = $("#categories_template").html();

    },

    render: function() {
      console.log("CategoriesView render");

      // Pour chaque catégories
      var cat, categoryView;
      var i = 0;
      var cat_length = mainView.tl.categories.length || 0;
      for ( i ; i < cat_length ; i++ ) {
        cat = mainView.tl.categories[i];
        categoryView = new TimeLine.Views.CategoryView( cat );
      }

      /*
      var renderedContent = Mustache.to_html( this.template , mainView.tl );
      this.$el.addClass("categories-"+mainView.tl.categories.length);
      this.$el.html(renderedContent);
      */
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
      //"click .event"            : "click_event",
      //"click .add_complement"   : "add_complement"
    },


    click_event: function (e) {
      console.log("click_event");
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
    },

    check_complement: function ( curr ) {
      console.log("check_complement", curr);
      var cat_id = this.find_category_id( curr );
      console.log("cat_id", cat_id);
      var cat = _.where(  mainView.tl.categories , { "id":cat_id })[0];
      console.log("cat", cat);
      var comp_length = ( cat.complements && cat.complements.length ) || 0;
      console.log("comp_length", comp_length);
      for ( var i = 0 ; i < comp_length ; i++ ) {
        mainView.complementsView.display_complement( cat.complements[i].id );
      }
    },

    add_complement: function () {
      console.log("add_complement");
      
    },

    find_category_id: function ( curr ) {
      return $(curr).parents(".category").data("id");
    }


  });
  return timeline;
}(TimeLine));