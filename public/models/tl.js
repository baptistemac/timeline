var TimeLine = (function(timeline) {

  timeline.Models.Tl = Backbone.Model.extend({

    //urlRoot: "/objects",

    defaults: {
      title               : "Machin bidule",
      date                : { start: 1880, end: 1980 },
      scale_1year_in_px   : 20,
      last_save           : "2014-08-13 21:00"
    },

    initialize: function( args, properties ) {
      console.log("Tlmodel initialize");

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
    },
    getKey: function() {
      return this.get("current_key");
    }

  });

  return timeline;
}(TimeLine));
