import Ember from 'ember';
import request from 'ember-ajax/request';

export default Ember.Route.extend({
  model() {
    return request('/assets/mock-data/metrics.json')
    .then(data => {
      const numIssues = Math.floor(Math.random() * 10);

      return {
        data: data,
        numIssues: numIssues
      };
    });
  },

  _dataSort(a, b) {
    return a.time.getTime() - b.time.getTime();
  },

  setupController(controller, model) {
    let barData = [];
    let lineData = [];
    const data = model.data;

    for(let i = 0; i < data.length; i++) {
      const item = data[i];
      const date = new Date(item.date);

      barData.push({
        time: date,
        value: parseInt(item.issues, 10) || 1,
        label: 'Number of Issues'
      });

      lineData.push({
        time: date,
        value: parseInt(item.customers, 10) || 1,
        label: 'Number of Paying Customers'
      });
    }

    lineData.sort(this._dataSort);
    barData.sort(this._dataSort);

    controller.setProperties({
      numIssues: model.numIssues,
      barData: Ember.A(barData),
      lineData: Ember.A(lineData)
    });
  }
});
