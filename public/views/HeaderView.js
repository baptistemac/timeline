var TimeLine = (function(timeline) {

  timeline.Views.HeaderView = Backbone.View.extend({

    el: "#header",

    initialize: function( options ) {

      console.log("HeaderView initialize");
      this.template = $("#header_template").html();
      this.parent = options.parent;

    },

    render: function() {

      var res       = {};
      res.log       = this.parent.log.attributes;
      res.tl        = this.parent.tlView.tl.attributes;
      console.log("HeaderView render", res);

      var renderedContent = Mustache.to_html( this.template, res );
      this.$el.html(renderedContent);

    },


    events : {
      "click .burger"       : "nav",

      "click .logo"         : "logo",
      "click .login"        : "login",
      "click .profil"       : "profil",

      "click .edit"         : "edit"
    },

    nav: function (e) {
      e.preventDefault();
      window.mainView.navView.toggle();
    },

    logo: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
      //mainView.homeView.show();
      //mainView.profilView.hide();
    },

    login: function (e) {
      e.preventDefault();
      mainView.modalView.show_login();
    },

    profil: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
    },

    edit: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
    }


  });
  return timeline;
}(TimeLine));