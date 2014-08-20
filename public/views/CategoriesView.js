var TimeLine = (function(timeline) {

  timeline.Views.CategoriesView = Backbone.View.extend({

    el: "#categories",

    // Variables disponibles :
    // this.tl_years = nombre d'année de la timleine
    // this.tl_width = largeur en px

    initialize: function() {
      console.log("CategoriesView initialize");

      // Définiton principale de la timeline
      this.setup_timeline();

      // Render de la la vue Categories
      this.template = $("#categories_template").html();
      this.render_main();

      // Définiton du tableau contenant les subviews
      this.subviews_arr = [];

      // Pour chaque catégorie, on créer une subview
      var cat_length = mainView.tl.categories.length || 0;
      for ( var i = 0 ; i < cat_length ; i++ ) {
        var category = mainView.tl.categories[i];
        var categoryView = new TimeLine.Views.CategoryView( { el:"#cat-"+i , model:category, parent:this } );
        this.subviews_arr.push( categoryView );
      }

      // Ajout de la class pour déterminer les hauteurs des .category
      this.$el.addClass( "categories-"+cat_length );

      // Render de toutes les subviews
      this.render();

    },


    render: function() {
      console.log("CategoriesView render");

      // Pour chaque catégorie/subview, on append et on render
      var cat_length = mainView.tl.categories.length || 0;
      for ( var i = 0 ; i < cat_length ; i++ ) {
        this.$el.append( this.subviews_arr[i].$el );
        this.subviews_arr[i].render();
      }

    },

    render_main: function () {
      console.log("CategoriesView render_main");

      // Render du template #categories,
      // contenant déjà les div.category pour acceuillir par la suite les subviews.
      var renderedContent = Mustache.to_html( this.template , mainView.tl );
      this.$el.html(renderedContent);
    },


    events : {
    },


    setup_timeline: function ( s ) {
      console.log("CategoriesView set_timeline");

      var s = mainView.tl.settings;
      
      // Définition de la longueur de #themes
      var days    = this.calcul_duration_between_dates( s.date.start, s.date.end );
      var years   = days / 365 ;
      var width   = Math.round( years * s.scale_1year_in_px );

      this.$el.css("width", width+"px");
      this.years  = years;
      this.width  = width;

      this.define_all_dates();

    },

    // Retourn une durée en jours
    calcul_duration_between_dates: function ( date1, date2 ) {
      var date1 = new Date(date1);
      var date2 = new Date(date2);
      var difference_ms = date2.getTime() - date1.getTime();
      // Set 1 day in milliseconds
      var ONE_DAY = 1000 * 60 * 60 * 24;
      return Math.round(difference_ms/ONE_DAY);
    },


    define_all_dates: function () {

      mainView.tl.dates = [ "1880", "1890", "1900", "1910", "1920", "1930", "1940", "1950", "1960", "1970", "1980" ];

    }



  });
  return timeline;
}(TimeLine));