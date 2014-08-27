yepnope({
  load: {
    jquery			: '../libs/vendors/jquery-1.10.2.js',
    underscore		: '../libs/vendors/underscore.js',
    backbone		: '../libs/vendors/backbone.js',
    mustache		: '../libs/vendors/mustache.js',

    //NameSpace
    keygame			: '../TimeLine.js',

    //Models
    tl              : '../models/tl.js',

    //Controllers
    mainview        : 'views/MainView.js',

    //Routes
    routes			: 'routes.js',

    json			: 'api.json'

    //functions		: 'js/functions.js'

  },

  callback: {},

  complete: function() {
    $(function() {

      console.log("Lauching wikipedia ...");
      
      //window.mainView = new TimeLine.Views.MainView();

    });

  } // Fin de complete
});