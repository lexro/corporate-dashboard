import Ember from 'ember';
import request from 'ember-ajax/request';

export default Ember.Route.extend({
  model() {
    return request('/assets/mock-data/employees.csv', {
      dataType: 'text'
    }).then(data => {
      const parsedData = Papa.parse(data).data;
      const fields = parsedData[0];
      let result = [];

      // - 1 because extra item with empty fields
      for(let i = 1; i < parsedData.length - 1; i++) {
        let parsedItem = parsedData[i];
        let item = {};

        for (let j = 0; j < fields.length; j++) {
          item[fields[j]] = parsedItem[j];
        }

        result.push(item);
      }

      return result;
    });
  },

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
  },

  setupController(controller, model) {
    controller.setProperties({
      lat: 41.097546,
      lng: -94.995486,
      zoom: 3,
      overlays: this._getOverlays(model),
      // https://snazzymaps.com/style/29/light-monochrome
      styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
    });
  }
});
