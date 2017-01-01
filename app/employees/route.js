import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.setProperties({
      lat: 41.097546,
      lng: -94.995486,
      zoom: 3,
      overlays: Ember.A([
        {
          id: 'unique-id',
          lat: 37.773972,
          lng: -122.431297,
          content: '<div class="arrow_box">100</div>',
          layer: 'floatPane',
          verticalAlign: 'middle',
          horizontalAlign: 'center',
          verticalOffset: -24,
          click: function() {},
          dblclick: function() {},
          mouseup: function() {},
          mousedown: function() {},
          mouseover: function() {},
          mousemove: function() {},
          mouseout: function() {}
        }
      ])
    });
  }
});
