var TimeLine = (function(timeline) {

  timeline.Models.Currentpage = Backbone.Model.extend({


    /* valeurs par défaut du modèle */
    defaults: {
      currentpage : ""
    },


    initialize: function() {

      console.log("Currentpage initialize currentpage", this.attributes.currentpage);
      this.on( "change:currentpage", this.update );

    },

    /* les getters et les setters à l'ancienne */
    // ...

    update: function() {
      console.log("-- Currentpage change:currentpage update");
    },

    getCurrentpage: function () {
      return this.attributes.currentpage;
    },

    setCurrentpage: function ( value ) {
      this.set("currentpage",value);
    },

    is_page: function ( value ) {
      if ( this.getCurrentpage() == value ) { return true; }
      else { return false; }
    }

  });

  return timeline;
}(TimeLine));
