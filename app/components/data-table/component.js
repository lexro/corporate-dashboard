import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
 init() {
    this._super(...arguments);

    let table = new Table(this.get('columns'), this.get('model'), { enableSync: true });
    this.set('table', table);
  },
  model: null,
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
        label: 'Submit Timestamp',
        valuePath: 'submitTimestamp',
        width: '75px'
      }
    ];
  }),

  displayedRows: Ember.observer('model', 'sort', 'filter', function() {
    const model = this.get('model');
    const sort = this.get('sort');

    if (sort) {
      model.sort((a, b) => {
        const valueA = a[sort.valuePath];
        const valueB = b[sort.valuePath];

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
    }
  }
});
