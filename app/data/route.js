import Ember from 'ember';

export default Ember.Route.extend({
  dataService: Ember.inject.service(),

  pollInterval: 3000,

  pollFunc: null,

  model() {
    return this.get('dataService').fetchIssueData();
  },

  // fake push updates
  afterModel() {
    let _this = this;

    Ember.run.once(function () {
      setInterval(function () {
        _this.model()
          .then((model) => {
            _this.set('context', model);
            _this.controller.set('model', _this.get('context'));
          });
      }, _this.pollInterval);
    });

  },

  setupController(controller, model) {
    controller.setProperties({
      model: model
    });
  },

  actions: {
    willTransition() {
      clearInterval(this.pollFunc);
    }
  }
});
