// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  awsBase: 's3.amazonaws.com',
  dfsSource: 'rotogrinders',
  dailyFantasyBase: 'https://rotogrinders.com',
  dailyFantasyJsonBase: 'json.rotogrinders.com',
  espnFantasyBaseballLeague: 1209434861,
  espnFantasyFootballLeague: 1209434861,
  espnFantasyBaseV2: 'https://site.api.espn.com/apis/fantasy/v2',
  espnFantasyBaseV3: 'https://fantasy.espn.com/apis/v3',
  espnFastcastBase: 'https://fcast.espncdn.com/FastcastService/pubsub/profiles/12000/topic/event-topevents/message',
  espnWebsocketHost: 'https://fastcast.semfs.engsvc.go.com/public/websockethost',
  espnOneFeed: 'https://onefeed.fan.api.espn.com/apis/v3/contentEngine',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
