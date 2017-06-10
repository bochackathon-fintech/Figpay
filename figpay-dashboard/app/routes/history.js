import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Pollster from '../custom-objects/pollster';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(){
    return this.get('store').findAll('consumer/payment');
  },
  afterModel: function (model, transition) {
    let _this = this;
    const PollingObj = Ember.Object.extend(Pollster, {
      interval: function () {
        return 2000; // Time between polls (in ms)
      }.property().readOnly()
    });
    let pollster = PollingObj.create();


    pollster.start(function () {
      console.log('polling...');
      _this.get('store').findAll('consumer/payment');
    });
    this.set('pollster', pollster);
  },
  actions: {
    willTransition(transition) {
      let pollster = this.get('pollster');
      pollster.stop();
      return true;
    },

  },
});
