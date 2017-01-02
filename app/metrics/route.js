import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.setProperties({
      numIssues: 10,
      barData: [
        {
          time: new Date(2013, 5, 1),
          value: 64,
          label: 'San Francisco'
        },
        {
          time: new Date(2013, 5, 1),
          value: 93,
          label: 'Phoenix'
        },
        {
          time: new Date(2013, 6, 1),
          value: 66,
          label: 'San Francisco'
        },
        {
          time: new Date(2013, 6, 1),
          value: 103,
          label: 'Phoenix'
        }
      ],
      lineData: [
        {
          time: new Date(2013, 5, 1),
          value: 64,
          label: 'San Francisco'
        },
        {
          time: new Date(2013, 5, 1),
          value: 93,
          label: 'Phoenix'
        },
        {
          time: new Date(2013, 6, 1),
          value: 66,
          label: 'San Francisco'
        },
        {
          time: new Date(2013, 6, 1),
          value: 103,
          label: 'Phoenix'
        }
      ]
    });
  }
});
