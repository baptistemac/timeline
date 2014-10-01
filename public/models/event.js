var TimeLine = (function(timeline) {

  timeline.Models.Event = Backbone.Model.extend({


    /* valeurs par défaut du modèle */
    defaults: {
      title     : "Title",
      type      : "book",
      date      : { start: "2014 08 28", end: "2014 08 50" },
      img       : ""
    },


    initialize: function() {

      console.log("Event initialize");
      
    },

    /* les getters et les setters à l'ancienne */
    // ...

    getTitle: function () {
      return this.attributes.title;
    },

    setTitle: function ( value ) {
      this.set("title",value);
    }

  });

  return timeline;
}(TimeLine));
