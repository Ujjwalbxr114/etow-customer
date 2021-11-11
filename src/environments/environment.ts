// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const hostnameWithoutPath = '//localhost:8000';
//const hostnameWithoutPath ='//https://ellipsonic.a2hosted.com/etowsg_api/';

// const hostnameWithoutPath = 'https://www.fig.ellipsonic.com';

const hostnameWithoutPath = 'http://18.136.120.59:9900';


export const environment = {
    production: false,
    hostnameWithoutPath,
    // endpointHostUrl: hostnameWithoutPath + '/api/v1',
    endpointHostUrl: hostnameWithoutPath ,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
