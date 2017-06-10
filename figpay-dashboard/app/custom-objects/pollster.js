import Ember from 'ember';

export default Ember.Mixin.create({
    interval: function () {
        return 60000; // Time between polls (in ms)
    }.property().readOnly(),

    // Schedules the function `f` to be executed every `interval` time.
    schedule: function (f) {
        return Ember.run.later(this, function () {
            f.apply(this);
            this.set('timer', this.schedule(f));
        }, this.get('interval'));
    },

    // Stops the pollster
    stop: function () {
        Ember.run.cancel(this.get('timer'));
    },

    // Starts the pollster, i.e. executes the `onPoll` function every interval.
    start: function (callback) {
        this.set('pollingCallback',callback);
        this.set('timer', this.schedule(this.get('onPoll')));
    },

    onPoll: function () {
        if (this.get('pollingCallback')){
            this.get('pollingCallback')();
        }
    }
});
