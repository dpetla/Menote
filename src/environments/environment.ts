// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  staging: false,
  firebase: {
    apiKey: 'AIzaSyBcC9pbQu9Xb6nmfs5WhpSB_1aWX6syQdU',
    authDomain: 'staging.menote.ca',
    databaseURL: 'https://ng-journal-app.firebaseio.com',
    projectId: 'ng-journal-app',
    storageBucket: 'ng-journal-app.appspot.com',
    messagingSenderId: '768544417123',
  },
  openWeatherMap: {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    appId: '0472660f4ad72389269180541cc26370',
  },
};
