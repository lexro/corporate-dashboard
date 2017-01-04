import Ember from 'ember';
import request from 'ember-ajax/request';

export default Ember.Route.extend({
  model() {
    return request('/assets/mock-data/issues.json');
  },

  setupController(controller, model) {
    controller.setProperties({
      model: model
    });
  }
});
