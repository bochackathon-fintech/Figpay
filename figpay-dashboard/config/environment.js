/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'dashboard-ember',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  ENV['ember-simple-auth'] = {
    crossOriginWhitelist: ['*'],
  };
  if (environment === 'development') {
    ENV.APP.API_HOST = 'http://localhost:8000';
    ENV.APP.API_NAMESPACE = 'api';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
  if (environment === 'stage') {
    ENV.APP.API_HOST = 'http://figbackend.hosted.pixelactions.com';
    ENV.APP.API_NAMESPACE = 'api';
    ENV['ember-simple-auth'] = {
      crossOriginWhitelist: ['*'],
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: '/api/token-auth/',
      identificationField: 'username',
      passwordField: 'password',
      tokenPropertyName: 'token',
      refreshTokenPropertyName: 'refresh_token',
      authorizationPrefix: 'Token ',
      authorizationHeaderName: 'Authorization',
      headers: {},
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'http://connect.paywithfig.com';
    ENV.APP.API_NAMESPACE = 'api';
    ENV['ember-simple-auth'] = {
      crossOriginWhitelist: ['*'],
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: '/api/token-auth/',
      identificationField: 'username',
      passwordField: 'password',
      tokenPropertyName: 'token',
      refreshTokenPropertyName: 'refresh_token',
      authorizationPrefix: 'Token ',
      authorizationHeaderName: 'Authorization',
      headers: {},
    };
  }


  return ENV;
};
