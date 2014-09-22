var TimeLine = (function(timeline) {

  timeline.Views.HomeView = Backbone.View.extend({

    el: "#home",

    initialize: function( options ) {

      console.log("HomeView initialize");
      this.template = $("#home_template").html();
      this.parent = options.parent;

      this.get_16last_updated_timelines();

    },

    render: function( options ) {

      var res           = {};
      res.logged_in     = TimeLine.session.attributes.logged_in;
      res.user          = TimeLine.session.user.attributes;
      res.timelines     = this.timelines || {};
      var show          = (options && options.show) || false;
      console.log("HomeView render", res);

      var renderedContent = Mustache.to_html( this.template , res );
      this.$el.html(renderedContent);
      if ( show ) this.show();

    },


    events : {
      "click .login"        : "login",
      "click .demo"         : "demo",
      "click .create"       : "create",
      "click .mini_tl > a"  : "mini_tl"
    },

    login : function (e) {
      e.preventDefault();
      console.log("HomeView login");
      mainView.modalView.show_login();
    },

    demo : function (e) {
      e.preventDefault();
      console.log("HomeView demo");
      var href = $(e.currentTarget).attr("href");
      console.log("navigate", href);
      window.router.navigate( href, true );
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


    get_16last_updated_timelines: function () {
      // catch 16 last timelines create
      this.timelines = [
        { "id": 0, "name": "Lorem ipsum dolor" },
        { "id": 1, "name": "Ipsum Aenean Consectetur" },
        { "id": 2, "name": "Risus Tristique Sem Sollicitudin" },
        { "id": 3, "name": "Ridiculus Mattis" },
        { "id": 4, "name": "Fusce Justo Egestas" },
        { "id": 5, "name": "Cras Pharetra Vestibulum Venenatis" },
        { "id": 6, "name": "Vestibulum Quam Egestas" },
        { "id": 7, "name": "Elit Euismod" },
        { "id": 8, "name": "Condimentum Egestas Tellus" },
        { "id": 9, "name": "Nullam" },
        { "id": 10, "name": "Tellus Malesuada" },
        { "id": 11, "name": "Pellentesque Tristique Fusce" },
        { "id": 12, "name": "Condimentum Fermentum" },
        { "id": 13, "name": "Dolor Pellentesque" },
        { "id": 14, "name": "Porta Vestibulum Magna" },
        { "id": 15, "name": "Cras Pharetra Vestibulum Venenatis" }
      ];
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