var TimeLine = (function(timeline) {

  timeline.Views.ComplementsView = Backbone.View.extend({


    initialize: function() {
      console.log("ComplementsView initialize");

      this.template = $("#complement_template").html();
      this.render();

    },

    render: function() {
      console.log("ComplementsView render");

      this.getComplement( this.id );

    },

    getComplement: function ( id ) {
      console.log("getComplement", id);
      var that = this;
      $.ajax({
        type: 'GET',
        url: '/complements/'+id,
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
          var error = { "title":"Oops. Un problème est survenu.", "message":"Impossible de récupèrer le complément." };
          mainView.modalView.show_error( error );
        },
        success: function (comp) {
          console.log("comp", comp);
          that.complement = comp;
          that.display_complement();
          //that.mainView.comp = comp;
          //that.instantiation();
          //that.render();
        }
      });
    },

    display_complement : function () {
      console.log("display_complement", this.complement );
      
      var renderedContent = Mustache.to_html( this.template , this.complement );
      this.$el.html( renderedContent );
      this.delegateEvents();

    }

  });
  return timeline;
}(TimeLine));