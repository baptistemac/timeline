var TimeLine = (function(timeline) {

  timeline.Views.HomeView = Backbone.View.extend({

    el: "#home",

    initialize: function( options ) {

      console.log("HomeView initialize");
      this.template = $("#home_template").html();
      this.parent = options.parent;

    },

    render: function() {

      var res       = {};
      res.log       = this.parent.log || {};
      res.timelines = this.parent.timelines || {};

      console.log("HomeView render", res);
      var renderedContent = Mustache.to_html( this.template , res );
      this.$el.html(renderedContent);
      this.show();

    },


    events : {
      "click .login"        : "login",
      "click .create"       : "create",
      "click .mini_tl > a"  : "mini_tl"
    },

    login : function (e) {
      e.preventDefault();
      console.log("HomeView login");
      mainView.modalView.show_login();
    },

    create: function (e) {
      e.preventDefault();
      console.log("HomeView create");
      mainView.modalView.show_create();
    },

    mini_tl: function (e) {
      e.preventDefault();
      console.log("HomeView mini_tl");
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
    },


    show : function () {
      console.log("HomeView show");
      this.$el.addClass("show");
    },

    hide: function () {
      console.log("HomeView hide");
      this.$el.removeClass("show");
    }

  });
  return timeline;
}(TimeLine));