var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    el: "body",
    
    map_display_duration: 2000, // a mettre dans TlMapView à terme.


    initialize: function() {

      console.log("MainView initialize");

      this.currentpage      = new TimeLine.Models.Currentpage();
      
      // Initialize Models
      this.log              = new TimeLine.Models.Log();

      // Initialize Views
      this.modalView        = new TimeLine.Views.ModalView();
      this.headerView       = new TimeLine.Views.HeaderView( { parent: this } );
      this.homeView         = new TimeLine.Views.HomeView( { parent: this } );
      this.profilView       = new TimeLine.Views.ProfilView();
      this.tlView           = new TimeLine.Views.TlView();

      // check if user is logged
      this.log.is_logged = true;

      // render
      this.render();

    },

    render: function () {

      console.log("MainView render");

    },


    events : {
      "keyup"                   : "keyup"
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
    }
  
  });
  return timeline;
}(TimeLine));