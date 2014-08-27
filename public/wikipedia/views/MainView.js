var TimeLine = (function(timeline) {

  timeline.Views.MainView = Backbone.View.extend({

    format: "json",

    initialize: function() {

      console.log("MainView wikipedia initialize");
      this.render();

    },

    render: function() {

      console.log("MainView wikipedia render");

      this.title = "Ronald_W._Reagan";


      var url = 'http://www.baptiste-macaire.com'; //http://en.wikipedia.org/w/api.php?action=query&format=json&redirects=true&titles=Ronald_W._Reagan'; //'http://api.alice.com/cors';
      var xhr = this.createCORSRequest('GET', url);
      console.log("xhr", xhr);
      xhr.send();

      //this.getJson();

    },


    // Create the XHR object.
    createCORSRequest: function (method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    },



    events : {
    },

    //
    // Get et Post JSON
    //

    getJson: function () {
      var url= "http://en.wikipedia.org/w/api.php?action=query&redirects=true&titles=Ronald_W._Reagan&prop=revisions&rvprop=content&rvsection=0";
      //var url = "http://en.wikipedia.org/w/api.php?action=query&format="+ this.format +"&titles="+this.title;

      var that = this;
      $.ajax({
        type: 'GET',
        url: url,
        error: function (err) {
          console.log("[Error] Impossible de récupérer le fichier JSON.", err);
        },
        success: function (data) {
          console.log( data );
        }
      });
    },

    saveJson: function () {
      console.log("saveJson", this.json);
      var that = this;
      $.ajax({
        type: 'POST',
        url: '/data',
        data: JSON.stringify( that.json ),
        dataType: 'json',
        contentType: 'application/json',
        error: function (err) {
          console.log("[Error]", err);
        },
        success: function () {
          console.log("POST JSON : Le fichier a bien été mis à jour.");
        }
      });
    }

  });
  return timeline;

}(TimeLine));
