var TimeLine = (function(timeline) {

  timeline.Views.FicheView = Backbone.View.extend({

    el: $("#fiche"),


    initialize: function() {
      console.log("FicheView initialize");
      this.template = $("#fiche_template").html();
    },

    render: function( event ) {
      console.log("FicheView render", event);
      var renderedContent = Mustache.to_html( this.template , event );
      this.$el.html(renderedContent);
    },

    events : {
      "click .close"      : "close_fiche"
    },


    open_fiche: function ( id ) {
      
      // Ajout des .active sur #themes et #map
      mainView.categoriesView.add_active_class( id, null);

      var event = this.find_id( id );
      this.render( event );
      // Todo: Si l'event sera caché par la fiche : if ( body.width - event.pos.x ) < ( fiche.width + 50 )
      // alors on décal le scroll de Xpx vers la gauche.
      $(this.el).addClass("open");
      // Pour éviter de cacher une partie de la timeline avec la fiche,
      // nous pourrions mettre #fiche à 25%, #themes à 75% et un enfant de theme avec width="2001px".
      // C'est une solution pure css. A tester.
      //var width = parseInt( $("#themes").css("width") );
      //$("#themes").css( "width", parseInt(width+300)+"px" );
      //console.log( "width", width, parseInt(width+300)+"px" );
    },

    close_fiche: function () {
      $(this.el).removeClass("open");
      $("#categories").find(".event.active").removeClass("active");
    },


    find_id: function ( id ) {
      var res, i; var cats_length = mainView.tl.categories.length;
      for ( i=0 ; i < cats_length ; i++ ) {
        res = _.where( mainView.tl.categories[i].events , { "id": id } )[0];
        if ( res ) return res;
      }
    }



  });
  return timeline;
}(TimeLine));