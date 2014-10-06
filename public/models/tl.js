var TimeLine = (function(timeline) {

  timeline.Models.Tl = Backbone.Model.extend({

    //urlRoot: "/objects",

    defaults: {
      date                : { start: 1880, end: 1980 },
      scale_1year_in_px   : 20,
      editable            : false,
      categories          : []
    },

    initialize: function( tl ) {
      console.log("Tlmodel initialize", this.attributes);

      // Set attributes
      /*
      if ( tl.settings.id ) 
        this.attributes.id = tl.settings.id;

      if ( tl.settings.scale_1year_in_px )
        this.attributes.scale_1year_in_px = tl.settings.scale_1year_in_px;
      */
      
      /*
      this.on("change:editable", function() {
        console.log("editable a changé :", this.attributes.editable);
      });
      
      /*
      this.on("change:read", function() {
        console.log("le read a changé :", this.get("read"));
        that.set({
          read: this.getRead()
        })
      });
      */
    },
    
    url: function(){
        return TimeLine.API;
    },

    /* les getters et les setters à l'ancienne */

    setKey: function (key) {
      this.set("current_key", key);
    },
    getKey: function() {
      return this.get("current_key");
    },

    setEditable: function () {
      console.log("Tlmodel setEditable", TimeLine.session);
      var logged_in = TimeLine.session.attributes.logged_in;
      var timelines = TimeLine.session.user.attributes.timelines;
      var id        = this.attributes.id; 
      console.log("Tlmodel setEditable", logged_in, timelines, id);

      if ( logged_in && _.contains( timelines, id ) ) {
        this.attributes.editable = true;
        console.log("editable OK");
      }
    },

    save: function ( callback ) {
        console.log("Tlmodel save");

        // set indication "saved"
        mainView.headerView.set_save_indication(true);

        // save


        var that = this;
        var postData = this.attributes;
        if(DEBUG) console.log("tl save postData", postData);

        $.ajax({
            url: that.url() + '/timeline/' + this.get("id"),
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data:  JSON.stringify( postData ),
            success: function(res){
                console.log("tl save success", res);
                if( !res.error ){

                    console.log("tl save success no-error");

                    // remove indication "saved"
                    mainView.headerView.set_save_indication(false);

                    if( callback && 'success' in callback ) callback.success(res);

                } else {
                    console.log("tl save success error");
                    if( callback && 'error' in callback ) callback.error(res);
                }
            },
            error: function(mod, res){
                if(callback && 'error' in callback ) callback.error(res);
            }
        }).complete( function(){
            if(callback && 'complete' in callback ) callback.complete(res);
        });
    },



    create: function ( callback ) {
      console.log("Tlmodel create", callback);

      var postData = this.attributes;
      postData.creator_id = TimeLine.session.user.attributes._id;

      var that = this;
      $.ajax({
          url: that.url() + '/timeline/create',
          contentType: 'application/json',
          dataType: 'json',
          type: 'POST',
          data:  JSON.stringify( postData ),
          success: function(res){
            console.log("res", res);
            // Attribution du nouvel id
            that.set( "id", res._id );
            if ( callback && "success" in callback ) callback.success(res._id);
          },
          error: function(mod, res){
              if(callback && 'error' in callback ) callback.error(res);
          }
      });
    }

  });

  return timeline;
}(TimeLine));
