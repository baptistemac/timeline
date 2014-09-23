var TimeLine = (function(timeline) {

  timeline.Models.Log = Backbone.Model.extend({


    /* valeurs par défaut du modèle */
    defaults: {
      is_logged : false,
      id        : "Baptiste",
      courriel  : "baptiste.mac@gmail.com",
      timelines : [
                    { "id": 0, "name": "Histoire de la sédition" },
                    { "id": 1, "name": "La guerre en Irak" }
                  ]
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
