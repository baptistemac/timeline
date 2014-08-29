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
      "click .login"      : "login",

      "click a.close"     : "close_modal",
      "click .overlay"    : "overlay_remove"
    },

    // Si je clique explicitement sur Annuler. Permet d'éviter les annulation involontaire en cliquant sur l'overlay. 
    close_modal : function (e) {
      if (e) { e.preventDefault(); }
      this.$el.find(".modal").removeClass("show error");
      //this.render( {} ); // Marche pas // Permet de toujours regénérer les modal. Car sinon le autofus du input ne se relance pas.
    },

    // Si je clique sur l'overlay.
    overlay_remove : function () {
      console.log("ModalView overlay_remove", this.md_content.overlay_remove);
      if ( this.md_content.overlay_remove || this.md_content.overlay_remove == undefined ) 
        this.$el.find(".modal").removeClass("show error");
    },

    show_error: function( error ) {
      error.class = "error";
      error.show = true;
      this.render( error );
    },

    show_login: function () {
      console.log("ModalView show_login");
      var login = {};
      login.title = "Connectez-vous";
      login.message = '<form><label for="identifiant">Identifiant</label><input type="text" id="identifiant" placeholder="Identifiant" autofocus><label for="password">Mot de passe</label><input type="password" id="password" placeholder="Mot de passe"><button class="btn style1 login" type="submit" name="connection">Connection</button></form><a href="close" class="close">Annuler</a>';
      login.show = true;
      this.render( login );
    },

    login: function (e) {
      e.preventDefault();
      console.log("ModalView login");
      mainView.log.set("is_logged", true);
      this.close_modal();
    },

    show_create: function () {
      console.log("ModalView show_login");
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
    }

  });
  return timeline;
}(TimeLine));