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
      "click a.close"     : "hide",
      "click .overlay"    : "hide_from_overlay"
    },


    show_error: function( error ) {
      error.class = "error";
      error.show = true;
      this.render( error );
    },

    show_create: function () {
      console.log("ModalView show_create");
      var create = {};
      create.title = "Créer une timeline";
      create.message = '<form><label for="title">Titre</label><input type="text" id="title" placeholder="Titre" autofocus required><label for="startdate">Année de début</label><input type="text" pattern="\\d*" id="startdate" placeholder="Année de début" required><label for="enddate">Année de fin</label><input type="text" pattern="\\d*" id="enddate" placeholder="Année de fin" required><button class="btn style1" type="submit" name="create">Créer</button></form><a href="close" class="close">Annuler</a>';
      create.overlay_remove = false;
      create.show = true;
      this.render( create );
    },

    show_portrait: function () {
      var portrait = {};
      portrait.title = "Connectez-vous";
      portrait.show = true;
      this.render( portrait );
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