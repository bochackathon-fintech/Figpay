import Model from 'ember-data/model';
import DS from 'ember-data';
import Pollster from 'dashboard-ember/custom-objects/pollster';

export default Model.extend({
  createdOn: DS.attr('date'),
  pos: DS.attr('string'),
  amount: DS.attr('number'),
  description: DS.attr('string'),

});

/*
interval: function () {
    return 2000; // Time between polls (in ms) - 5m
  }.property().readOnly(),
  */
