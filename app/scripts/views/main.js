define(function(require) {

  var templates = require('templates');

  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');
  var VS = require('visualsearch');

  var resourceViews = {
    courses: require('views/courses'),
    sessions: require('views/sessions'),
    universities: require('views/universities'),
    categories: require('views/categories'),
    instructors: require('views/instructors')
  };

  return Backbone.View.extend({
    initialize: function() {

    },
    template: templates['app/scripts/templates/app.ejs'],
    render: function() {
      this.$el.html(this.template());
      this.initVS();
      return this;
    },
    initVS: function () {
      VS.init({
        container: this.$('.visual_search'),
        query: '',
        callbacks: {
          search: function(query, searchCollection) {
            console.log(query, searchCollection)
          },
          facetMatches: function(callback) {
            var resources = _.map(this.model.getResourceTypes(), function(type) {
              return {
                label: type,
                category: 'Resource'
              };
            });
            callback(resources);
          }.bind(this),

          valueMatches: _.debounce(function(facet, searchTerm, callback) {
            this.model.fetchResource(facet).then(function(collection) {
              var searched = collection.search(searchTerm);
              var view = new resourceViews[facet]({model: searched});
              this.$('.content').empty().html(view.render().$el);
            }.bind(this));
          }.bind(this), 200)
        }
      });
    }
  });

});
