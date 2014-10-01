var TimeLine = (function(timeline) {

  timeline.Models.Tl = Backbone.Model.extend({

    //urlRoot: "/objects",

    defaults: {
      settings: {
        date                : { start: 1880, end: 1980 },
        scale_1year_in_px   : 20,
        last_save           : "2014-08-13 21:00"
      },
      editable            : false
    },

    initialize: function( tl ) {
      this.attributes = tl;
      console.log("Tlmodel initialize", this.attributes);
      if (TimeLine.session.attributes.logged_in) this.setEditable();

      
      this.on("change:editable", function() {
        console.log("editable a changé :", this.attributes.editable);
      });
      
      /*
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
    },

    setEditable: function () {
      console.log("TlView setEditable", TimeLine.session);
      var logged_in = TimeLine.session.attributes.logged_in;
      var timelines = TimeLine.session.user.attributes.timelines;
      var id = this.attributes.settings.id; 
      console.log("TlView setEditable", logged_in, timelines, id);

      if ( logged_in && _.contains( timelines, id ) ) {
        this.attributes.editable = true;
        console.log("editable OK");
      }
    }

  });

  return timeline;
}(TimeLine));
