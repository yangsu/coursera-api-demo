define(function(require) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var Q = require('q');
  var $ = require('jquery');

  var Collection = require('models/collection');

  return Backbone.Model.extend({
    getResourceTypes: function() {
      return _.chain(this.attributes).keys().without('sessions').value();
    },
    getUrlForResource: function (resource) {
      var resourceSchema = this.get(resource);
      return resourceSchema.url + '?fields='+ _.keys(resourceSchema.fields).join(',');
    },
    fetchResource: function(resource) {
      return Q($.get(this.getUrlForResource(resource))).then(function(data) {
        return new Collection(data.elements);
      });
    }
  });

});
