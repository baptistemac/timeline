var TimeLine = (function(timeline) {

  timeline.Models.Event = Backbone.Model.extend({


    /* valeurs par défaut du modèle */
    defaults: {
      title     : "Title",
      type      : "baptiste.mac@gmail.com",
      date      : { start: "2014 08 28", end: "2014 08 50" },
      img       : "",
    },


    initialize: function() {

      console.log("Log initialize is_logged", this.attributes.is_logged);
      this.on( "change:is_logged", this.update );
      
    },

    /* les getters et les setters à l'ancienne */
    // ...

    update: function() {
      console.log("-- Log change:is_logged update");
      mainView.headerView.render();
      mainView.homeView.render();
      mainView.profilView.render();
    },

    getKey: function () {
      return this.attributes.key;
    },

    setKey: function ( value ) {
      this.set("key",value);
    }

  });

  return timeline;
}(TimeLine));
