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
      //res.tl.editable   = this.parent.tlView.tl.attributes.editable;
      console.log("HeaderView render", res);

      var renderedContent = Mustache.to_html( this.template, res );
      this.$el.html(renderedContent);

    },


    events : {
      "click .burger"       : "nav",

      "click .logo"         : "logo",
      "click h1 a"          : "timeline",
      "click .login"        : "login",
      "click .profil"       : "profil",
      "click .create"       : "create_timeline",

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

    timeline: function (e) {
      e.preventDefault();
      this.navigate(e);
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

    create_timeline: function (e) {
      e.preventDefault();
      console.log("create_timeline", TimeLine.session );
      //window.router.navigate( "/create", {trigger: true, replace: false} );
      if ( TimeLine.session.logged_in ) {
        mainView.createTlView.show();
      } else {
        mainView.loginView.show();
      }
    },

    add_event: function (e) {
      console.log("add_event");
      e.preventDefault();
      mainView.tlView.add_event();
    },

    edit: function (e) {
      e.preventDefault();

    },


    navigate: function (e) {
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
    }




  });
  return timeline;
}(TimeLine));