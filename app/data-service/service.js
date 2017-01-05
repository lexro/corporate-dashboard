import Ember from 'ember';
import request from 'ember-ajax/request';

export default Ember.Service.extend({
  fetchEmployeeData() {
    return request('/assets/mock-data/employees.csv', {
      dataType: 'text'
    }).then(data => {
      // convert to json
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

      // randomize data a bit
      for(let i = 0; i < result.length; i++) {
        result[i].employees = Math.floor(result[i].employees * Math.random()) + 1;
      }

      return result;
    });
  },

  fetchIssueData() {
    return request('/assets/mock-data/issues.json')
      .then((data) => {
        return this._shuffle(data); // appearance of updating dating
      });
  },

  fetchMetricData() {
    return request('/assets/mock-data/metrics.json')
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const numIssues = Math.floor(Math.random() * 10);

        data.unshift(data[randomIndex]);

        return {
          data: data,
          numIssues: numIssues
        };
      });
  },

  // borrowed from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  _shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
});
