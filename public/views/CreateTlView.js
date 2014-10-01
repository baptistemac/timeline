var TimeLine = (function(timeline) {

  timeline.Views.CreateTlView = Backbone.View.extend({

    el: "#create",

    initialize: function() {
      console.log("CreateTlView initialize");
      this.template = $("#create_template").html();
      this.render();
    },

    render:function () {
      console.log("CreateTlView render");
      var renderedContent = Mustache.to_html( this.template , {});
      this.$el.html(renderedContent);
    },


    events : {
      'click #create-btn'                     : 'create',
      'click .close'                          : 'hide'
    },

    create: function (e) {
      e.preventDefault();
      if ( this.$el.find("#create-form").parsley('validate') ) {
        tl = {};
        tl.settings = {
          //id                  : this.get_new_id(),
          title               : this.$el.find("#createtimeline-title-input").val(),
          date                : { 
                                start: this.$el.find("#createtimeline-datestart-input").val(), 
                                end: this.$el.find("#createtimeline-dateend-input").val() 
                              },
          creation_date       : TimeLine.get_today()
        };
        console.log("create tl", tl);
        mainView.tlView.initialize_tl( tl );
        mainView.homeView.hide();
        this.hide();
        window.router.navigate( "/0", {trigger: false, replace: false} );
      } else {
        if(DEBUG) console.log("Did not pass clientside validation");
      }
    },

    show : function () {
      console.log("CreateTlView show");

      this.$el.find('.numberonly').bind('keypress', function (event) {
          var regex = new RegExp('^\\d+$');
          var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
          console.log("key", key, !regex.test(key));
          if (!regex.test(key)) {
             event.preventDefault();
             return false;
          }
      });

      this.$el.find("> .modal").addClass("show");
    },

    hide: function () {
      console.log("CreateTlView hide");
      this.$el.find('input.numberonly').unbind('keypress');
      this.$el.find("> .modal").removeClass("show");
    }

  });
  return timeline;
}(TimeLine));