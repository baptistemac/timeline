var TimeLine = (function(timeline) {

  timeline.Views.FicheView = Backbone.View.extend({

    el: "#fiche",


    initialize: function( options ) {
      console.log("FicheView initialize");
      this.template = $("#fiche_template").html();
      this.parent   = options.parent;
      //this.is_open  = false;
    },

    render: function() {
      console.log("FicheView render");
      var renderedContent = Mustache.to_html( this.template , this.event );
      this.$el.html(renderedContent);
    },

    events : {
      "click .close"      : "close",
      "click .edit"       : "edit",
      //"click .save"       : "save",

      "input [contenteditable=true]" : "save"
    },


    open: function ( id , options) {
      
      console.log("FicheView open");

      // options : { edit, add_class }

      // Ajout des .active sur #themes et #map
      //mainView.categoriesView.add_active_class( id, null);

      //this.id = id;

      this.find_data( id );

      this.render();

      //this.is_open = true;
      this.parent.currentevent = true;
      this.parent.currentevent_id = id;

      if ( options.edit ) {
        this.$el.addClass("open fiche-edit");
      } else {
        this.$el.addClass("open");
      }

      if ( options.add_class ) {
        var categoryview = _.where(  this.parent.tlView.subviews_arr , { "id": this.category_id })[0];
        categoryview.add_event_class( this.id, null );
        categoryview.add_category_class();
        this.parent.mapView.active_id( this.id );
      }

      // Todo: Si l'event sera caché par la fiche : if ( body.width - event.pos.x ) < ( fiche.width + 50 )
      // alors on décal le scroll de Xpx vers la gauche.
      
      // Pour éviter de cacher une partie de la timeline avec la fiche,
      // nous pourrions mettre #fiche à 25%, #themes à 75% et un enfant de theme avec width="2001px".
      // C'est une solution pure css. A tester.
      //var width = parseInt( $("#themes").css("width") );
      //$("#themes").css( "width", parseInt(width+300)+"px" );
      //console.log( "width", width, parseInt(width+300)+"px" );
    },

    close: function () {
      //this.is_open = false;
      this.parent.currentevent = false;
      this.$el.removeClass("open")
      .siblings("#timeline").find("#tl").find(">.active").removeClass("active")
      .find(".events > .active").removeClass("active");
    },

    find_data: function ( id ) {
      var res, i; var cats_length = this.parent.tl.attributes.categories.length;
      for ( i=0 ; i < cats_length ; i++ ) {
        res = _.where( this.parent.tl.attributes.categories[i].events , { "id": id } )[0];
        if ( res ) {
          this.category_id = this.parent.tl.attributes.categories[i].id;
          this.event = res;
          return;
        }
      }
    },

    

    //
    // Édition de la fiche
    //


    edit: function (e) {
      e.preventDefault();
      console.log("FicheView edit");
      this.$el.addClass("fiche-edit");
      this.make_contenteditable();
    },

    save: function (e) {
      e.preventDefault();
      console.log("FicheView save", mainView.tlView.tl.attributes);
      var json  = _.omit(mainView.tlView.tl.attributes, ['dates','editable']);
      console.log("json", json);
      //this.remove_contenteditable();
      //this.$el.removeClass("fiche-edit");
    },


    make_contenteditable: function () {
        this.$el.find(".title")
                    .attr("contenteditable", "true")
                    .attr("data-placeholder", "Title")
                    .attr("data-maxlength", "10")
                    //.addClass( (item.getTitle()) ? "" : "defaut-value" )
                    .focus()
                .siblings(".author")
                    .attr("contenteditable", "true")
                    .attr("data-placeholder", "Author")
                .siblings(".chapeau")
                    .attr("contenteditable", "true")
                    .attr("data-placeholder", "Chapeau")
                .siblings(".text")
                    .attr("contenteditable", "true")
                    .attr("data-placeholder", "Text");
                //.data("bar", "foobar")
                //.addClass( (item.getAuthor()) ? "" : "defaut-value" );

    },

    remove_contenteditable: function (li) {
      this.$el.find(".item-title").attr("contenteditable", "false").removeClass("defaut-value")
          .siblings(".item-author").attr("contenteditable", "false").removeClass("defaut-value");
    }

  });
  return timeline;
}(TimeLine));