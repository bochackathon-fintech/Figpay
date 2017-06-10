import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'dashboard-ember/config/environment';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(credentials) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: ENV.APP.API_HOST + '/api/token-auth/',
        type: 'POST',
        data: JSON.stringify({
          username: credentials.identification,
          password: credentials.password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then((response) => {
        console.log(response);
        $.ajaxSetup({
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Token " + response.token);
          }
        });
        Ember.run(function () {
          resolve({
            token: response.token
          });
        });
      }, (xhr, status, error) => {
        var response = xhr.responseText;
        Ember.run(function () {
          reject(response);
        });
      });
    });
  },
});
