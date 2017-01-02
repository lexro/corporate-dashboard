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
            width: '150px'
          },
          {
            label: 'Customer Email',
            valuePath: 'customerEmail',
            width: '150px'
          },
          {
            label: 'Customer Name',
            valuePath: 'customerName',
            width: '150px'
          },
          {
            label: 'Description',
            valuePath: 'description',
            width: '150px'
          },
          {
            label: 'Employee Name',
            valuePath: 'employeeName',
            width: '150px'
          },
          {
            label: 'isOpen',
            valuePath: 'isOpen',
            width: '150px'
          },
          {
            label: 'Submit Timestamp',
            valuePath: 'submitTimestamp',
            width: '150px'
          }
        ];
      }),

      table: Ember.computed('model', function() {
       return new Table(this.get('columns'), this.get('model'));
      })
    });
  }
});
