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

      var md_content = md_content || {};
      var renderedContent = Mustache.to_html( this.template , md_content );
      this.$el.html(renderedContent);

    },


    events : {
      "click a.close"     : "remove_modal",
      "click .overlay"    : "remove_modal"
    },

    remove_modal : function (e) {
      if (e) { e.preventDefault(); }
      $(this.el).find(".modal").removeClass("show error");
    },

    show_error: function( error ) {
      error.class = "error";
      error.show = true;
      this.render( error );
    },

    show_login: function () {
      var login = {};
      login.title = "Connectez-vous";
      login.message = '<form><label for="identifiant">Identifiant</label><input type="text" id="identifiant" placeholder="Identifiant"><label for="password">Mot de passe</label><input type="password" id="password" placeholder="Mot de passe"><button class="btn style1" type="submit" name="connection">Connection</button></form><a href="close" class="close">Annuler</a>';
      login.show = true;
      this.render( login );
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