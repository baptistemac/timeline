var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    el: "body",

    initialize: function() {

      console.log("MainView initialize");
      this.getData();

    },


    getData: function () {

      var that = this;
      $.ajax({
        type: 'GET',
        url: '/data',
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
        },
        success: function (data) {
          console.log("data", data);
          that.render();
        }
      });

    },

    render: function() {

      console.log("MainView render");
      this.themesView = new TimeLine.Views.ThemesView();
      this.ficheView = new TimeLine.Views.FicheView();

    },


    events : {

    }


  });
  return timeline;
}(TimeLine));