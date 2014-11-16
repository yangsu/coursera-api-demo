define(function(require) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var Q = require('q');
  var $ = require('jquery');

  var Collection = Backbone.Collection.extend({
    search: function(term) {
      if (term) {
        return new Collection(this.filter(function(model) {
          var text = JSON.stringify(model.toJSON()).toLowerCase();
          return _.all(term.split(' '), function(t) {
            return text.indexOf(t) >= 0;
          });
        }));
      } else {
        return this;
      }
    }
  });

  return Collection;

});
