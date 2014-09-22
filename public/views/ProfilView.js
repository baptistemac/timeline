var TimeLine = (function(timeline) {

  timeline.Views.ProfilView = Backbone.View.extend({

    el: "#profil",

    initialize: function() {

      console.log("ProfilView initialize");
      this.template = $("#profil_template").html();

    },

    render: function( options ) {

      var res           = {};
      res.logged_in     = TimeLine.session.attributes.logged_in;
      res.user          = TimeLine.session.user.attributes;
      var show          = (options && options.show) || false;
      console.log("ProfilView render", res);

      var renderedContent = Mustache.to_html( this.template , res );
      this.$el.html(renderedContent);
      if ( show ) this.show();

    },


    events : {
      "click .logout"       : "logout",
      "click .login"        : "login",
      "click .removeAccont" : "removeAccount"
    },

    logout: function (e) {
      e.preventDefault();
      console.log("ProfilView logout");

      TimeLine.session.logout({}, {
          success: function(mod, res){
              if(DEBUG) console.log("SUCCESS", mod, res);
              window.router.navigate( "/", true );
          },
          error: function(err){
              if(DEBUG) console.log("ERROR", err);
              TimeLine.showAlert('Uh oh!', err.error, 'alert-danger'); 
          }
      });
    },

    login: function (e) {
      e.preventDefault();
      mainView.modalView.show_login();
    },

    removeAccount: function(e){
        e.preventDefault();
        TimeLine.session.removeAccount({});
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