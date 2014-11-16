/*global require*/
require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    visualsearch: {
      deps: ['jquery', 'jquery-ui', 'underscore', 'backbone'],
      exports: 'VS'
    }
  },
  paths: {
    text: '../bower_components/requirejs-plugins/lib/text',
    json: '../bower_components/requirejs-plugins/src/json',
    jquery: '../bower_components/jquery/dist/jquery',
    'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
    visualsearch: '../bower_components/visualsearch/build-min/visualsearch',
    q: '../bower_components/q/q'
  }
});

require([
  'backbone',
  'jquery',
  'json!../data/api.json',
  'views/main',
  'models/api',
  'jquery-ui',
], function(Backbone, $, apiSchema, MainView, ApiModel) {
  Backbone.history.start();

  var model = new ApiModel(apiSchema);
  var view = new MainView({model: model});
  $('body').append(view.render().$el);
});
