import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  createdOn: DS.attr('string'),
  pos: DS.attr('string'),
  amount: DS.attr('number'),
  description: DS.attr('description')
});
