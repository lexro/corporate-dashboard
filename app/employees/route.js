import Ember from 'ember';

export default Ember.Route.extend({
  dataService: Ember.inject.service(),

  pollInterval: 3000,

  pollFunc: null,

  model() {
    return this.get('dataService').fetchEmployeeData();
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

      lat: 41.097546,

      lng: -94.995486,

      zoom: 3,

      overlays: Ember.computed('model', function () {
        const model = this.get('model');
        return this._getOverlays(model);
      }),

      // https://snazzymaps.com/style/29/light-monochrome
      styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}],

      _getOverlays(model) {
        let overlays = [];

        for(let i = 0; i < model.length; i++) {
          let item = model[i];

          overlays.push({
            id: item.id,
            lat: parseFloat(item.latitude, 10),
            lng: parseFloat(item.longitude, 10),
            content: `<div class="arrow_box">${item.employees}</div>`,
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
          });
        }

        return Ember.A(overlays);
      }

    });
  },

  actions: {
    willTransition() {
      clearInterval(this.pollFunc);
    }
  }
});
