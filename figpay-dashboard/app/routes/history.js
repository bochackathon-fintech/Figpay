import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    console.log(this.get('store'));
    return this.get('store').findAll('consumer/payment');
  }
});
