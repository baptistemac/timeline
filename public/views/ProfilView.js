var TimeLine = (function(timeline) {

  timeline.Views.ProfilView = Backbone.View.extend({

    el: "#profil",

    initialize: function() {

      console.log("ProfilView initialize");
      this.template = $("#profil_template").html();

    },

    render: function( options ) {

      var res       = {};
      res.log       = mainView.log.attributes;
      var show      = (options && options.show) || false;
      console.log("ProfilView render", res);

      var renderedContent = Mustache.to_html( this.template , res );
      this.$el.html(renderedContent);
      if ( show ) this.show();

    },


    events : {
      "click .logout"     : "logout",
      "click .login"      : "login"
    },

    logout: function (e) {
      e.preventDefault();
      console.log("ProfilView logout");
      mainView.log.set( "is_logged", false);
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
    },

    login: function (e) {
      e.preventDefault();
      mainView.modalView.show_login();
    },

    show : function () {
      console.log("ProfilView show");
      this.$el.addClass("show");
    },

    hide: function () {
      console.log("ProfilView hide");
      this.$el.removeClass("show");
    }

  });
  return timeline;
}(TimeLine));