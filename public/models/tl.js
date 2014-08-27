var TimeLine = (function(timeline) {

  timeline.Models.tl = Backbone.Model.extend({

    //urlRoot: "/objects",

    defaults: {
      current_key: ""
    },

    initialize: function( args, properties ) {
      var that = this;
      console.log("args", args, "properties", properties);

      // Positionnement aléatoire de l'objet
      var mapview = args.mapview;
      var key = args.mapview.keys_available[ Math.floor( Math.random() * args.mapview.keys_available.length ) ];
      // La touche choisie est retirée du tableau des touches disponibles pour ne pas avoir 2 objets sur la même touche.
      args.mapview.keys_available = _.without( args.mapview.keys_available, key );
      this.setKey(key);

      /*
      this.on("change:message", function() {
        console.log("le message a changé :", this.get("message"));
      });
      this.on("change:read", function() {
        console.log("le read a changé :", this.get("read"));
        that.set({
          read: this.getRead()
        })
      });
      */
    },

    /* les getters et les setters à l'ancienne */
    setKey: function (key) {
      this.set("current_key", key);
      window.keyboard.display_bonus(key);
    },
    getKey: function() {
      return this.get("current_key");
    }

  });


  timeline.Collections.Objects = Backbone.Collection.extend({
    model: timeline.Models.Objects,
    initialize: function () {}
  });

  return timeline;
}(TimeLine));
