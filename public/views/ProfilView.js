var TimeLine = (function(timeline) {

  timeline.Views.ProfilView = Backbone.View.extend({

    el: "#profil",

    initialize: function() {

      console.log("ProfilView initialize");
      this.template = $("#profil_template").html();

    },

    render: function() {

      var res = {};
      res.log = window.mainView.log;

      console.log("ProfilView render", res);
      var renderedContent = Mustache.to_html( this.template , res );
      this.$el.html(renderedContent);
      this.show();
    },


    events : {
      "click .logout"     : "logout"
    },

    logout: function () {
      console.log("ProfilView logout");
      window.mainView.log.is_logged = false;
      mainView.headerView.render();
      mainView.homeView.render();
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