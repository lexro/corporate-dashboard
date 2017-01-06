import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
 init() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'));
    this.set('table', table);
  },

  model: null,

  columns: Ember.computed(function() {
    return [
      {
        label: 'Submit Timestamp',
        valuePath: 'submitTimestamp',
        width: '170px'
      },
      {
        label: 'Customer Email',
        valuePath: 'customerEmail',
        width: '170px'
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
        width: '50px'
      },
      {
        label: 'Closed Timestamp',
        valuePath: 'closedTimestamp',
        width: '170px'
      }
    ];
  }),

  displayedRows: Ember.observer('model', 'sort', 'filter', function() {
    let model = this.get('model');
    const sort = this.get('sort');
    const filter = this.get('filter');

    if (filter) {
      model = model.filter((item) =>{
        for(let i in filter) {
          if (item[i] === filter[i]) {
            return true;
          }
        }
      });
    }

    if (sort) {
      model.sort((a, b) => {
        const valueA = a[sort.valuePath];
        const valueB = b[sort.valuePath];

        if (sort.valuePath === 'submitTimestamp') {
          console.log('sort?');
          const timeA = new Date(valueA).getTime() || 0;
          const timeB = new Date(valueB).getTime() || 0;

          if (sort.isAscending) {
            return timeA - timeB;
          }

          return timeB - timeA;
        }

        if (sort.isAscending) {
          if (valueA < valueB) {
            return -1;
          } else if (valueA > valueB) {
            return 1;
          }

          return 0;
        }

        if (valueB < valueA) {
          return -1;
        } else if (valueB > valueA) {
          return 1;
        }

        return 0;
      });
    }

    const table = this.get('table');
    table.setRows(model);
  }),

  employeeNames: Ember.computed('model', function () {
    const model = this.get('model') || [];

    return model.map((item) => {
      return item.employeeName;
    });
  }),

  sort: null,

  filter: null,

  actions: {
    onColumnClick(column) {
      if (column.sorted) {
        this.set('sort', {
          valuePath: column.get('valuePath'),
          isAscending: column.ascending
        });
      }
    },

    filterByStatus(value) {
      if (value) {
        const filter = this.get('filter') || {};
        filter['isOpen'] = value === 'open';
        this.set('filter', Object.create(filter));
      } else {
        this.set('filter', undefined);
      }
    },

    filterByEmployee(value) {
      if (value) {
        const filter = this.get('filter') || {};
        filter['employeeName'] = value;
        this.set('filter', Object.create(filter));
      } else {
        this.set('filter', undefined);
      }
    },

    clearAllFilters() {
      this.set('filter', undefined);
    }
  }
});
