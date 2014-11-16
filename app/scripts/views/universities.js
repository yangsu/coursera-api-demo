define(function(require) {

  var templates = require('templates');

  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');

  return Backbone.View.extend({
    initialize: function() {
    },
    template: templates['app/scripts/templates/universities.ejs'],
    render: function() {
      this.$el.html(this.template({
        collection: this.model
      }));
      return this;
    }
  });

});
