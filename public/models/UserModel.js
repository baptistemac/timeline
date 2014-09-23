/**
 * @desc		stores the POST state and response state of authentication for user
 */
 /*
define([
    "app",
    "utils"
], function(app){
*/

var TimeLine = (function(timeline) {

    timeline.Models.UserModel = Backbone.Model.extend({

        initialize: function(){
           // _.bindAll(this);
        },

        defaults: {
            username: '',
            email: '',
            timelines: []
        },

        url: function(){
            return TimeLine.API + '/user';
        }

    });
    
  return timeline;
  
}(TimeLine));

