import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Route.extend({
  model() {
    return Ember.A([{
      firstName: 'Lex',
      lastName: 'Lacson'
    },
    {
      firstName: 'a',
      lastName: 'z'
    }]);
  },

  setupController(controller, model) {
    controller.setProperties({
      model: model,
      columns: Ember.computed(function() {
        return [{
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
  }
});
