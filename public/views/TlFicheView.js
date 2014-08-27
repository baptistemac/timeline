var TimeLine = (function(timeline) {

  timeline.Views.FicheView = Backbone.View.extend({

    el: "#fiche",


    initialize: function( options ) {
      console.log("FicheView initialize");
      this.template = $("#fiche_template").html();
      this.parent   = options.parent;
      this.is_open  = false;
    },

    render: function() {
      console.log("FicheView render");
      var renderedContent = Mustache.to_html( this.template , this.event );
      this.$el.html(renderedContent);
    },

    events : {
      "click .close"      : "close_fiche"
    },


    open_fiche: function ( id , add_class) {
      
      // Ajout des .active sur #themes et #map
      //mainView.categoriesView.add_active_class( id, null);

      this.id = id;

      this.find_data( id );

      this.render();

      this.is_open = true;
      this.$el.addClass("open");

      if ( add_class ) {
        var categoryview = _.where(  this.parent.categoriesView.subviews_arr , { "id": this.category_id })[0];
        categoryview.add_event_class( this.id, null );
        categoryview.add_category_class();
        this.parent.mapView.active_id( this.id );
      }

      // Todo: Si l'event sera caché par la fiche : if ( body.width - event.pos.x ) < ( fiche.width + 50 )
      // alors on décal le scroll de Xpx vers la gauche.
      
      // Pour éviter de cacher une partie de la timeline avec la fiche,
      // nous pourrions mettre #fiche à 25%, #themes à 75% et un enfant de theme avec width="2001px".
      // C'est une solution pure css. A tester.
      //var width = parseInt( $("#themes").css("width") );
      //$("#themes").css( "width", parseInt(width+300)+"px" );
      //console.log( "width", width, parseInt(width+300)+"px" );
    },

    close_fiche: function () {
      this.is_open = false;
      this.$el.removeClass("open")
      .siblings("#categories").find(">.active").removeClass("active")
      .find(".events > .active").removeClass("active");
    },


    find_data: function ( id ) {
      var res, i; var cats_length = this.parent.tl.categories.length;
      for ( i=0 ; i < cats_length ; i++ ) {
        res = _.where( this.parent.tl.categories[i].events , { "id": id } )[0];
        if ( res ) {
          this.category_id = this.parent.tl.categories[i].id;
          this.event = res;
          return;
        }
      }
    }



  });
  return timeline;
}(TimeLine));