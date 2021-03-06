var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    el: "body",
    
    map_display_duration: 2000, // a mettre dans TlMapView à terme.


    initialize: function() {

      console.log("MainView initialize");

      // Initialize Models
      this.currentpage      = new TimeLine.Models.Currentpage();

      // Initialize Views
      this.loginView        = new TimeLine.Views.LoginView();
      this.createTlView     = new TimeLine.Views.CreateTlView();
      this.modalView        = new TimeLine.Views.ModalView();
      this.headerView       = new TimeLine.Views.HeaderView( { parent: this } );
      this.homeView         = new TimeLine.Views.HomeView( { parent: this } );
      this.profilView       = new TimeLine.Views.ProfilView();
      this.tlView           = new TimeLine.Views.TlView();

      // render
      this.render();

    },

    render: function () {

      console.log("MainView render");

    },


    events : {
      "click #header-alert .close"       : "hideAlert"
      //"keyup"                   : "keyup"
    },

    keyup: function (e) {
      console.log("keyup", e.keyCode);

      switch(e.keyCode) {
        case 38 :
          console.log("38");
          break;
        case 39 :
          console.log("39");
          break;
        case 40 :
          console.log("40");
          break;
        case 37 :
          console.log("37");
          break;
      }
      console.log(this.currentpage.getCurrentpage(), this.tlView.currentevent);
      if ( this.currentpage.getCurrentpage() == "timeline" && this.tlView.currentevent ) {
        e.preventDefault();
        // On check si l'event courant a des siblings
        this.tlView.nextEvent( current_event );
      }
    },


    /*
      Gestion des alertes
    */
    showAlert: function (title, text, klass) {
        if (timeout) clearTimeout(timeout);
        this.$el.find("#header-alert .alert")
        .removeClass("alert-danger alert-warning alert-success alert-info").addClass(klass)
        .html('<strong>' + title + '</strong> ' + text + '<a href="#" class="close"><span></span></a>')
        .parent().fadeIn(250);
        var timeout = setTimeout(function() {
            $("#header-alert").fadeOut(250);
        }, 7000 );
    },

    hideAlert: function (e) {
      if (e) e.preventDefault();
      this.$el.find("#header-alert").fadeOut(250);
    }
  
  });
  return timeline;
}(TimeLine));