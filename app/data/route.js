import Ember from 'ember';
import Table from 'ember-light-table';
import request from 'ember-ajax/request';

export default Ember.Route.extend({
  model() {
    return request('/assets/mock-data/issues.json')
    .then(data => {
      console.log('data:', data);

      return data;
    });
  },

  setupController(controller, model) {
    controller.setProperties({
      model: model,
      columns: Ember.computed(function() {
        return [
          {
            label: 'Closed Timestamp',
            valuePath: 'closedTimestamp',
            width: '75px'
          },
          {
            label: 'Customer Email',
            valuePath: 'customerEmail',
            width: '150px'
          },
          {
            label: 'Customer Name',
            valuePath: 'customerName',
            width: '100px'
          },
          {
            label: 'Description',
            valuePath: 'description',
            width: '150px'
          },
          {
            label: 'Employee Name',
            valuePath: 'employeeName',
            width: '100px'
          },
          {
            label: 'isOpen',
            valuePath: 'isOpen',
            width: '50px'
          },
          {
            label: 'Submit Timestamp',
            valuePath: 'submitTimestamp',
            width: '75px'
          }
        ];
      }),

      table: Ember.computed('model', function() {
       return new Table(this.get('columns'), this.get('model'));
      })
    });
  }
});
