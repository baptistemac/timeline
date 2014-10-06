/**
 * @desc		stores the POST state and response state of authentication for user
 */
 /*
define([
    "app",
    "models/UserModel",
    "utils"
], function(app, UserModel){
*/

var TimeLine = (function(timeline) {

    timeline.Models.SessionModel = Backbone.Model.extend({

        // Initialize with negative/empty defaults
        // These will be overriden after the initial checkAuth
        defaults: {
            logged_in: false,
            user_id: ''
        },

        initialize: function(){

            //_.bindAll(this);

            // Each time logged_in change, rerender views if login ou logout
            this.bind( "change:logged_in", this.update_views );

            // Singleton user object
            // Access or listen on this throughout any module with app.session.user
            this.user = new TimeLine.Models.UserModel({ });
        },

        // Rerender views if login ou logout
        update_views: function () {
            console.log("update_views", window.mainView);
            // Si mainview existe, car au début SessionModel existe avant mainView
            if (window.mainView) {
                mainView.headerView.render();
                mainView.homeView.render();
                mainView.profilView.render();
                mainView.tlView.ficheView.render();
            }
        },

        url: function(){
            return TimeLine.API + '/auth';
        },

        // Fxn to update user attributes after recieving API response
        updateSessionUser: function( userData ){
            console.log("updateSessionUser", userData);
            _.extend( this.user.attributes, userData);
            //this.user.set( _.pick( userData, _.keys(this.user.defaults) ) );
            console.log("this.user", this.user.attributes);
        },


        /*
         * Check for session from API 
         * The API will parse client cookies using its secret token
         * and return a user object if authenticated
         */
        checkAuth: function(callback, args) {
            console.log("checkAuth");

            var that = this;
            $.ajax({
                url: this.url(),
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(res){
                    if ( res.user ) {
                        console.log("checkAuth success", res.user);
                        that.updateSessionUser( res.user );
                        that.set({ logged_in: true });
                    } else {
                        // USer is not already connected
                        that.set({ logged_in: false });
                    }
                },
                error: function(mod, res){

                }
            }).complete( function(){
                if(callback && 'complete' in callback ) callback.complete();
            });

        },


        /*
         * Abstracted fxn to make a POST request to the auth endpoint
         * This takes care of the CSRF header for security, as well as
         * updating the user and session after receiving an API response
         */
        postAuth: function(opts, callback, args){
            var that = this;
            var postData = _.omit(opts, 'method');
            if(DEBUG) console.log("postAuth postData", postData);

            $.ajax({
                url: this.url() + '/' + opts.method,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data:  JSON.stringify( postData ),
                success: function(res){
                    console.log("postAuth success", res);
                    if( !res.error ){

                        console.log("postAuth success no-error");

                        if(_.indexOf(['login', 'signup'], opts.method) !== -1){

                            console.log("postAuth success updateSessionUser", res);
                            that.updateSessionUser( res.user || {} );
                            that.set({ user_id: res._id, logged_in: true });

                        } else {
                            that.set({ logged_in: false });
                        }

                        if( callback && 'success' in callback ) callback.success(res);

                    } else {
                        console.log("postAuth success error");
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


        login: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'login' }), callback);
        },

        logout: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'logout' }), callback);
        },

        signup: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'signup' }), callback);
        },

        removeAccount: function(opts, callback, args){
            opts = this.user.attributes;
            this.postAuth(_.extend(opts, { method: 'remove_account' }), callback);
        },

        save: function(opts, callback, args){
            opts = this.user.attributes;
            this.postAuth(_.extend(opts, { method: 'save' }), callback);
        }

    });
    
  return timeline;

}(TimeLine));

