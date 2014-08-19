var TimeLine = (function(timeline) {

  timeline.Views.HeaderView = Backbone.View.extend({

    el: $("#header"),

    initialize: function() {

      console.log("HeaderView initialize");
      this.template = $("#header_template").html();
      //this.render();

    },

    render: function() {

      console.log("HeaderView render");
      var renderedContent = Mustache.to_html( this.template, mainView.tl.settings );
      this.$el.html(renderedContent);

    },


    events : {
      "click .burger"       : "nav",
      "click .login"        : "login",
      "click .edit"         : "edit"
    },

    nav: function (e) {
      e.preventDefault();
      window.mainView.navView.toggle();
    },

    login: function (e) {
      e.preventDefault();
      mainView.modalView.show_login();
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