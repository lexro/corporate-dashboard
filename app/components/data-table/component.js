import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
  model: null,

  columns: Ember.computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatar',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }];
  }),

  table: Ember.computed('model', function() {
   return new Table(this.get('columns'), this.get('model'));
  })
});
