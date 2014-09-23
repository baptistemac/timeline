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

            // Singleton user object
            // Access or listen on this throughout any module with app.session.user
            this.user = new TimeLine.Models.UserModel({ });
        },


        url: function(){
            return TimeLine.API + '/auth';
        },

        // Fxn to update user attributes after recieving API response
        updateSessionUser: function( userData ){
            console.log("updateSessionUser");
            this.user.set( _.pick( userData, _.keys(this.user.defaults) ) );
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
                        that.set({ logged_in : true });
                    } else {
                        // USer is not already connected
                        that.set({ logged_in : false });
                    }
                },
                error: function(mod, res){
                    if(callback && 'error' in callback ) callback.error(res);
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
            var self = this;
            var postData = _.omit(opts, 'method');
            if(DEBUG) console.log(postData);

            $.ajax({
                url: this.url() + '/' + opts.method,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                data:  JSON.stringify( postData ),
                success: function(res){
                    console.log("postAuth success");
                    if( !res.error ){
                        console.log("postAuth success no-error");
                        if(_.indexOf(['login', 'signup'], opts.method) !== -1){
                            console.log("postAuth success updateSessionUser", res.user);
                            self.updateSessionUser( res.user || {} );
                            self.set({ user_id: res.user.id, logged_in: true });
                        } else {
                            self.set({ logged_in: false });
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
            this.postAuth(_.extend(opts, { method: 'remove_account' }), callback);
        }

    });
    
  return timeline;

}(TimeLine));

