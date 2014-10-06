var TimeLine = (function(timeline) {

  timeline.Views.LoginView = Backbone.View.extend({

    el: "#login",

    initialize: function() {

      console.log("LoginView initialize");
      this.template = $("#login_template").html();
      this.render();

      // Listen for session logged_in state changes and re-render
      TimeLine.session.on("change:logged_in", this.onLoginStatusChange);

    },


    events : {
      'click #login-btn'                      : 'onLoginAttempt',
      'click #signup-btn'                     : 'onSignupAttempt',
      'keyup #login-password-input'           : 'onPasswordKeyup',
      'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup',
      'click .close'                          : 'hide'
    },


    // Allow enter press to trigger login
    onPasswordKeyup: function(evt){
        var k = evt.keyCode || evt.which;

        if (k == 13 && $('#login-password-input').val() === ''){
            evt.preventDefault();    // prevent enter-press submit when input is empty
        } else if(k == 13){
            evt.preventDefault();
            this.onLoginAttempt();
            return false;
        }
    },

    // Allow enter press to trigger signup
    onConfirmPasswordKeyup: function(evt){
        var k = evt.keyCode || evt.which;

        if (k == 13 && $('#confirm-password-input').val() === ''){
            evt.preventDefault();   // prevent enter-press submit when input is empty
        } else if(k == 13){
            evt.preventDefault();
            this.onSignupAttempt();
            return false;
        }
    },

    onLoginAttempt: function(e){
        if(e) e.preventDefault();

        if(this.$el.find("#login-form").parsley('validate')){
            var that = this;
            TimeLine.session.login({
                username: that.$el.find("#login-username-input").val(),
                password: that.$el.find("#login-password-input").val()
            }, {
                success: function(mod, res){
                    if(DEBUG) console.log("SUCCESS", mod, res);
                    that.hide();
/*                    mainView.headerView.render();
                    mainView.homeView.render();
                    mainView.profilView.render();
                    mainView.tlView.ficheView.render();
                    mainView.tlView.tl.setEditable();*/
                },
                error: function(err){
                    if(DEBUG) console.log("ERROR", err);
                    mainView.showAlert('Bummer dude!', err.error, 'alert-danger'); 
                }
            });
        
        } else {
            // Invalid clientside validations thru parsley
            if(DEBUG) console.log("Did not pass clientside validation");
        }
        
    },
    

    onSignupAttempt: function(evt){
        console.log("onSignupAttempt");
        if(evt) evt.preventDefault();

        if(this.$el.find("#signup-form").parsley('validate')){
          var that = this;
          TimeLine.session.signup({
              username: that.$el.find("#signup-username-input").val(),
              password: that.$el.find("#signup-password-input").val()
          }, {
              success: function(mod, res){
                  if(DEBUG) console.log("SUCCESS", mod, res);
                  that.hide();
                  mainView.headerView.render();
                  mainView.homeView.render();
                  mainView.profilView.render();
              },
              error: function(err){
                  if(DEBUG) console.log("ERROR", err);
                  mainView.showAlert('Uh oh!', err.error, 'alert-danger'); 
              }
          });
        } else {
            // Invalid clientside validations thru parsley
            if(DEBUG) console.log("Did not pass clientside validation");

        }
    },


    onLoginStatusChange: function(evt){
      console.log("onLoginStatusChange");
        if( TimeLine.session.get("logged_in") ) mainView.showAlert("Success!", "Logged in as "+TimeLine.session.user.get("username"), "alert-success");
        else mainView.showAlert("See ya!", "Logged out successfully", "alert-success");
    },


    render:function () {
      console.log("LoginView render");
      var renderedContent = Mustache.to_html( this.template , {
        user: TimeLine.session.user.toJSON()
      });
      this.$el.html(renderedContent);
    },

    /*
    close: function () {
      console.log("LoginView close");
      // On referme l'écran
      this.$el.find("> .modal").removeClass("show");
      // On update la page en cours
      mainView.headerView.render();
    }
    */
    show : function () {
      console.log("ProfilView show");
      this.$el.find("> .modal").addClass("show");
    },

    hide: function () {
      console.log("ProfilView hide");
      this.$el.find("> .modal").removeClass("show");
    }

  });
  return timeline;
}(TimeLine));