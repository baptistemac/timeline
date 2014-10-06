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
      "click .logout"         : "logout",
      "click .login"          : "login",
      "click .save"           : "save",
      "click .removeAccount"  : "removeAccount"
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
        mainView.modalView.show_removeAccount();
    },

    show : function () {
      console.log("ProfilView show");
      this.$el.addClass("show");
    },

    hide: function () {
      console.log("ProfilView hide");
      this.$el.removeClass("show");
    },

    save: function (e) {
      e.preventDefault();
      console.log("ProfilView save");

      if(this.$el.find("#profil-form").parsley('validate')){

          var user = {};
          user.username = this.$el.find("#profil-username-input").val();
          user.email    = this.$el.find("#profil-email-input").val();
          
          console.log("user", user);
          TimeLine.session.updateSessionUser( user );

          TimeLine.session.save();

          /*
          var that = this;
          TimeLine.session.login({
              username: that.$el.find("#login-username-input").val(),
              password: that.$el.find("#login-password-input").val()
          }, {
              success: function(mod, res){
                  if(DEBUG) console.log("SUCCESS", mod, res);
                  that.hide();
              },
              error: function(err){
                  if(DEBUG) console.log("ERROR", err);
                  mainView.showAlert('Bummer dude!', err.error, 'alert-danger'); 
              }
          });
          */

      } else {
          // Invalid clientside validations thru parsley
          if(DEBUG) console.log("Did not pass clientside validation");
      }
    }

  });
  return timeline;
}(TimeLine));