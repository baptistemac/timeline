var TimeLine = (function(timeline) {

  timeline.Views.ModalView = Backbone.View.extend({

    el: "#modal",

    initialize: function() {

        console.log("ModalView initialize");
        this.template = $("#modal_template").html();
        this.render();

    },

    render: function( md_content ) {

        console.log("ModalView render", md_content);
        this.md_content = md_content || {};
        var renderedContent = Mustache.to_html( this.template ,this.md_content );
        this.$el.html(renderedContent);

    },


    events : {
        "click a.close"         : "hide",
        "click .overlay"        : "hide_from_overlay",

        "click .removeAccount"  : "removeAccount"
    },


    show_error: function( error ) {
        error.class = "error";
        error.show = true;
        this.render( error );
    },

    show_portrait: function () {
        var portrait    = {};
        portrait.title  = "Connectez-vous";
        portrait.show   = true;
        this.render( portrait );
    },

    show_removeAccount: function () {
        var modal     = {};
        modal.title   = 'Veuillez confirmer la suppression de votre compte.';
        modal.message = '<button id="remove-account-btn" class="btn style1 removeAccount" type="submit">Je confirme la suppression</button><a href="close" class="close">Annuler</a>';
        modal.class   = "error";
        modal.show    = true;
        this.render( modal );
    },
    removeAccount: function () {
        var that = this;
        TimeLine.session.removeAccount({}, {
          success: function(mod, res){
              if(DEBUG) console.log("SUCCESS", mod, res);
              window.router.navigate( "/", true );
              that.hide();
          },
          error: function(err){
              if(DEBUG) console.log("ERROR", err);
              TimeLine.showAlert('Uh oh!', err.error, 'alert-danger'); 
          }
        });
    },

    // Si je clique explicitement sur Annuler. Permet d'éviter les annulation involontaire en cliquant sur l'overlay. 
    hide : function (e) {
        if (e) { e.preventDefault(); }
        this.$el.find(".modal").removeClass("show error");
        //this.render( {} ); // Marche pas // Permet de toujours regénérer les modal. Car sinon le autofus du input ne se relance pas.
    },

    // Si je clique sur l'overlay.
    hide_from_overlay : function () {
        console.log("ModalView overlay_remove", this.md_content.overlay_remove);
        if ( this.md_content.overlay_remove || this.md_content.overlay_remove == undefined ) 
          this.$el.find(".modal").removeClass("show error");
    }


  });
  return timeline;
}(TimeLine));