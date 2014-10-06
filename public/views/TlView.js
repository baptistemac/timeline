var TimeLine = (function(timeline) {

  timeline.Views.TlView = Backbone.View.extend({

    el: "#tl",

    // Variables disponibles :

    currentevent: false,
    // currentevent_id

    /*
    this.tl.years = nombre d'année de la timleine
    this.tl.width = largeur en px
    this.tl.view_prct = largeur de la vue en pourcentage
    */

    initialize: function( tl ) {
        console.log("TlView initialize", tl);
        this.template = $("#tl_template").html();

        //this.complementsView  = new TimeLine.Views.ComplementsView();
        this.mapView          = new TimeLine.Views.MapView();
        this.ficheView        = new TimeLine.Views.FicheView( { parent: this } );
        this.handlecompView   = new TimeLine.Views.HandlecompView();

    },


    getTimeline: function ( id ) {

        var that = this;
        $.ajax({
            type: 'GET',
            url: '/data/timeline/'+id,
            error: function (err) {
                console.log("[Error] Impossible de récupérer le fichier JSON.", err);
                var error = { "title":"Oops. Un problème est survenu.", "message":"Impossible de récupèrer le fichier JSON." };
                window.mainView.modalView.show_error( error );
            },
            success: function (tl) {
                console.log("getTimeline tl", tl);
                that.initialize_tl( tl );
            }
        });

    },



    initialize_tl: function( tl ) {
      console.log("TlView initialize_tl", tl, "id:", tl.id);
      
      // Instantiation du model
      this.tl = new TimeLine.Models.Tl( tl.settings );

      // Si le id n'existe pas, c'est donc une création de timeline,
      // nous allons donc lui en générer un.
      if ( !this.tl.attributes.id ) {

          // Get new timeline ID ans save it
          var that = this;
          this.tl.create({
              success: function( id ) {

                  // Set root
                  window.router.navigate( "/"+id, {trigger: false, replace: true} );

                  // Add and save user.timelines
                  TimeLine.session.user.get( "timelines").push( id );
                  TimeLine.session.save( TimeLine.session.user.attributes );

              }, error: function() {
                  console.error("Erreur lors de l'enregistrement de la timeline.");
              }
          });
      }
      

      // Set editable true or false
      if (TimeLine.session.attributes.logged_in) this.tl.setEditable();

      console.log( "this.tl", this.tl.attributes );

      // Définiton principale de la timeline
      this.setup_timeline();

      // Définition de la ligne de temps
      this.define_all_dates();

      // Mise à jour du Header avec le bon title et date..
      mainView.headerView.render();

      // Render de la la vue Tl
      this.render_main();

      // Définiton du tableau contenant les subviews
      this.subviews_arr = [];

      // Pour chaque catégorie, on créer une subview
      var cat_length = this.tl.attributes.categories.length || 0;
      for ( var i = 0 ; i < cat_length ; i++ ) {
        var category = this.tl.attributes.categories[i];
        var categoryView = new TimeLine.Views.CategoryView( { el:"#cat-"+i , model:category, parent:this } );
        this.subviews_arr.push( categoryView );
      }

      // Ajout de la class pour déterminer les hauteurs des .category
      this.$el.addClass( "categories-"+cat_length );

      // Render de toutes les subviews
      this.render();
      this.$el.parent("#timeline").addClass("show");

      // Render de la map
      this.mapView.render();
      

    },


    setup_timeline: function ( s ) {
      var attr = this.tl.attributes;
      console.log("TlView set_timeline", attr.scale_1year_in_px);

      // Définition de la longueur de #themes
      var period_days    = this.calcul_duration_between_dates( attr.date.start, attr.date.end );
      var period_years   = Math.round( period_days / 365 );
      var width          = Math.round( period_years * attr.scale_1year_in_px );

      this.$el.css("width", width+"px");
      this.tl.set( "period", period_years );
      this.tl.set( "width", width );

      // Définition du pourcentage de largeur entre le viewport et la timeline
      var view_prct = Math.round( $(window).width() / width * 10000 ) / 100;
      this.tl.set( "view_prct", view_prct );

      console.log("TlView set_timeline", this.tl.attributes);

    },


    render_main: function () {
      console.log("CategoriesView render_main");

      // Render du template #categories,
      // contenant déjà les div.category pour acceuillir par la suite les subviews.
      var renderedContent = Mustache.to_html( this.template , this.tl.attributes );
      this.$el.html(renderedContent);
    },


    render: function() {
      
      console.log("TlView render");

      // Pour chaque catégorie/subview, on append et on render
      var cat_length = this.tl.attributes.categories.length || 0;
      for ( var i = 0 ; i < cat_length ; i++ ) {
        this.$el.append( this.subviews_arr[i].$el );
        this.subviews_arr[i].render();
      }

    },


    events : {
    },


    add_event: function () {
      console.log("add_event", this.tl.events);
      var new_event = new TimeLine.Models.Event();
      var u = _.max( this.tl.events, function(event) { console.log("-",event.id); return event.id; } );
      console.log("u", u);
      var id  = 18; //new_event.id;
      this.ficheView.open( id, { edit: true, add_class:false } );
    },


    nextEvent: function () {
      console.log("nextEvent");
      this.ficheView.open(9);
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
      this.tl.set( "dates", [ 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980 ] );
    },



    hide: function () {
      console.log("TlView hide");
      this.$el.parent("#timeline").removeClass("show");
    }



  });
  return timeline;
}(TimeLine));