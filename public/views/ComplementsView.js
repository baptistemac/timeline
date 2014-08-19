var TimeLine = (function(timeline) {

  timeline.Views.ComplementsView = Backbone.View.extend({


    initialize: function() {
      console.log("ComplementsView initialize");

    },

    render: function() {
      console.log("ComplementsView render");

    },

    getComplement: function ( id ) {
      console.log("getComplement", id);
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/complements/'+id,
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
          var error = { "title":"Oops. Un problème est survenu.", "message":"Impossible de récupèrer le fichier JSON." };
          that.mainView.modalView.show_error( error );
        },
        success: function (comp) {
          console.log("comp", comp);
          //that.mainView.comp = comp;
          //that.instantiation();
          //that.render();
        }
      });
    },

    display_complement : function ( id ) {
      console.log("display_complement", id);
      this.getComplement( id );

    }

  });
  return timeline;
}(TimeLine));