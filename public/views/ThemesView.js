var TimeLine = (function(timeline) {

  timeline.Views.ThemesView = Backbone.View.extend({

    el: $("#themes"),

    initialize: function() {

      console.log("ThemesView initialize");
      this.template = $("#themes_template").html();
      this.render();

    },

    render: function() {

      var test = {
        "categorie" : [
        {
          "name": "Palestine",
          "events": [{"title":"intifada"}, {"title":"2ème intifade"}]
        },
        {
          "name": "France",
          "events": [{"title":"Prise de la Bastille"}, {"title":"Consitution des droits de l'homme"}]
        },
        {
          "name": "Russie",
          "events": [{"title":"Révolution"}, {"title":"truc"}]
        },
        {
          "name": "France",
          "events": [{"title":"Prise de la Bastille"}, {"title":"Consitution des droits de l'homme"}]
        },
        {
          "name": "Russie",
          "events": [{"title":"Révolution"}, {"title":"truc"}]
        }
        ]
      };

      console.log("ThemesView render", test);
      var renderedContent = Mustache.to_html( this.template , test );
      this.$el.addClass("themes-"+test.categorie.length);
      this.$el.html(renderedContent);

    },


    events : {

    }


  });
  return timeline;
}(TimeLine));