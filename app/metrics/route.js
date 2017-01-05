import Ember from 'ember';

export default Ember.Route.extend({
  dataService: Ember.inject.service(),

  pollInterval: 1500,

  pollFunc: null,

  model() {
    return this.get('dataService').fetchMetricData();
  },

  // query the "api" with new data again
  afterModel() {
    let _this = this;

    Ember.run.once(function () {
      _this.pollFunc = setInterval(function () {
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
      model: model,

      numIssues: Ember.computed('model.numIssues', function () {
        return this.get('model.numIssues') || 0;
      }),

      barData: Ember.computed('model.data', function () {
        let barData = [];
        const data = this.get('model.data');

        for(let i = 0; i < data.length; i++) {
          const item = data[i];
          const date = new Date(item.date);

          barData.push({
            time: date,
            value: parseInt(item.issues, 10) || 1,
            label: 'Number of Issues'
          });
        }

        // barData.sort(this._dataSort);

        return Ember.A(barData);
      }),

      lineData: Ember.computed('model.data', function () {
        let lineData = [];
        const data = this.get('model.data');

        for(let i = 0; i < data.length; i++) {
          const item = data[i];
          const date = new Date(item.date);

          lineData.push({
            time: date,
            value: parseInt(item.customers, 10) || 1,
            label: 'Number of Paying Customers'
          });
        }

        // lineData.sort(this._dataSort);

        return Ember.A(lineData);
      })
    });
  },

  actions: {
    willTransition() {
      clearInterval(this.pollFunc);
    }
  }
});
