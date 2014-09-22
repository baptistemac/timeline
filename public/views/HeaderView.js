var TimeLine = (function(timeline) {

  timeline.Views.HeaderView = Backbone.View.extend({

    el: "#header",

    initialize: function( options ) {

      console.log("HeaderView initialize");
      this.template = $("#header_template").html();
      this.parent = options.parent;

    },

    render: function() {

      var res           = {};
      res.currentpage   = { timeline: this.parent.currentpage.is_page( "timeline" ) };
      res.logged_in     = TimeLine.session.attributes.logged_in;
      res.user          = TimeLine.session.user.attributes;
      res.tl            = ( this.parent.tlView.tl && this.parent.tlView.tl.attributes ) || null ;
      console.log("HeaderView render", res);

      var renderedContent = Mustache.to_html( this.template, res );
      this.$el.html(renderedContent);

    },


    events : {
      "click .burger"       : "nav",

      "click .logo"         : "logo",
      "click .login"        : "login",
      "click .profil"       : "profil",

      "click .add"          : "add_event",
      "click .edit"         : "edit"
    },

    nav: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
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
      mainView.loginView.show();
    },

    profil: function (e) {
      e.preventDefault();
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
    },

    add_event: function (e) {
      console.log("add_event");
      e.preventDefault();
      var new_event = new TimeLine.Models.Event();
      mainView.ficheView.add_event();
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