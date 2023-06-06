import { Stadium } from './stadium.model';
import { MlbTeam } from '../team/mlb-team.m';

// https://a.espncdn.com/redesign/assets/img/mlb/fields/5.png

export const MLB_STADIUM_MAP: { [key in MlbTeam]: Stadium } = {
  [MlbTeam.LAA]: {
    team: 'Anaheim Angels',
    name: 'Edison International Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/edison_international_field.gif',
    lat: 33.799572,
    lng: -117.889031,
  },
  [MlbTeam.Ari]: {
    team: 'Arizona Diamondbacks',
    name: 'Bankone Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/bank_one_ballpark.gif',
    lat: 33.452922,
    lng: -112.038669,
  },
  [MlbTeam.Atl]: {
    team: 'Atlanta Braves',
    name: 'Turner Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/turner_field.gif',
    lat: 33.74691,
    lng: -84.391239,
  },
  [MlbTeam.Bal]: {
    team: 'Baltimore Orioles',
    name: 'Camden Yards',
    img: 'https://www.baseball-almanac.com/stadium/directions/oriole_park_at_camden_yards.gif',
    lat: 39.285243,
    lng: -76.620103,
  },
  [MlbTeam.Bos]: {
    team: 'Boston Red Sox',
    name: 'Fenway Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/fenway_park.gif',
    lat: 42.346613,
    lng: -71.098817,
  },
  [MlbTeam.ChC]: {
    team: 'Chicago Cubs',
    name: 'Wrigley Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/wrigley_field.gif',
    lat: 41.947201,
    lng: -87.656413,
  },
  [MlbTeam.ChW]: {
    team: 'Chicago White Sox',
    name: 'Guaranteed Rate Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/us_cellular_field.gif',
    lat: 41.830883,
    lng: -87.635083,
  },
  [MlbTeam.Cin]: {
    team: 'Cincinnati Reds',
    name: 'Great American Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/great_american_ballpark.gif',
    lat: 39.107183,
    lng: -84.507713,
  },
  [MlbTeam.Cle]: {
    team: 'Cleveland Indians',
    name: 'Progressive Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/jacobs_field.gif',
    lat: 41.495149,
    lng: -81.68709,
  },
  [MlbTeam.Col]: {
    team: 'Colorado Rockies',
    name: 'Coors Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/coors_field.gif',
    lat: 39.75698,
    lng: -104.965329,
  },
  [MlbTeam.Det]: {
    team: 'Detroit Tigers',
    name: 'Comerica Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/comerica_park.gif',
    lat: 42.346354,
    lng: -83.059619,
  },
  [MlbTeam.Hou]: {
    team: 'Houston Astros',
    name: 'Minute Maid Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/minute_maid_park.gif',
    lat: 29.76045,
    lng: -95.369784,
  },
  [MlbTeam.KC]: {
    team: 'Kansas City Royals',
    name: 'Kauffman Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/kauffman_stadium.gif',
    lat: 39.10222,
    lng: -94.583559,
  },
  [MlbTeam.LAD]: {
    team: 'Los Angeles Dodgers',
    name: 'Dodger Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/dodger_stadium.gif',
    lat: 34.072437,
    lng: -118.246879,
  },
  [MlbTeam.Mil]: {
    team: 'Milwaukee Brewers',
    name: 'Miller Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/miller_park.gif',
    lat: 43.04205,
    lng: -87.905599,
  },
  [MlbTeam.Min]: {
    team: 'Minnesota Twins',
    name: 'Metrodome',
    img: 'https://www.baseball-almanac.com/stadium/directions/metrodome.gif',
    lat: 44.974346,
    lng: -93.259616,
  },
  [MlbTeam.Wsh]: {
    team: 'Washington Nationals',
    name: 'Nationals Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/nationals_park.gif',
    lat: 38.87,
    lng: -77.01,
  },
  [MlbTeam.NYM]: {
    team: 'New York Mets',
    name: 'Citi Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/citi-field.gif',
    lat: 40.75535,
    lng: -73.843219,
  },
  [MlbTeam.NYY]: {
    team: 'New York Yankees',
    name: 'Yankee Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/yankee_stadium.gif',
    lat: 40.819782,
    lng: -73.929939,
  },
  [MlbTeam.Oak]: {
    team: 'Oakland Athletics',
    name: 'Oakland Coliseum',
    img: 'https://www.baseball-almanac.com/stadium/directions/network_associates_coliseum.gif',
    lat: 37.74923,
    lng: -122.196487,
  },
  [MlbTeam.Phi]: {
    team: 'Philadelphia Phillies',
    name: 'Citizens Bank Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/citizens_bank_ballpark.gif',
    lat: 39.952313,
    lng: -75.162392,
  },
  [MlbTeam.Pit]: {
    team: 'Pittsburgh Pirates',
    name: 'PNC Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/PNC_park.gif',
    lat: 40.461503,
    lng: -80.008924,
  },
  [MlbTeam.StL]: {
    team: 'St. Louis Cardinals',
    name: 'Busch Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/busch_stadium.gif',
    lat: 38.629683,
    lng: -90.188247,
  },
  [MlbTeam.SD]: {
    team: 'San Diego Padres',
    name: 'Petco Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/petco_park.gif',
    lat: 32.752148,
    lng: -117.143635,
  },
  [MlbTeam.SF]: {
    team: 'San Francisco Giants',
    name: 'Pacific Bell Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/pac_bell_park.gif',
    lat: 37.77987,
    lng: -122.389754,
  },
  [MlbTeam.Sea]: {
    team: 'Seattle Mariners',
    name: 'Safeco Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/safeco_field.gif',
    lat: 47.60174,
    lng: -122.330829,
  },
  [MlbTeam.TB]: {
    team: 'Tampa Bay Devil Rays',
    name: 'Tropicana Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/tropicana_field.gif',
    lat: 27.768487,
    lng: -82.648191,
  },
  [MlbTeam.Tex]: {
    team: 'Texas Rangers',
    name: 'Ballpark in Arlington',
    img: 'https://www.baseball-almanac.com/stadium/directions/ballpark_in_arlington.gif',
    lat: 32.750156,
    lng: -97.081117,
  },
  [MlbTeam.Tor]: {
    team: 'Toronto Blue Jays',
    name: 'Skydome',
    img: 'https://www.baseball-almanac.com/stadium/directions/skydome.gif',
    lat: 43.641653,
    lng: -79.3917,
  },
  [MlbTeam.Mia]: {
    team: 'Miami Marlins',
    name: 'LoanDepot Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/pro_player_park.gif',
    lat: 0,
    lng: 0,
  },
  0: {
    team: 'Unknown',
    name: 'Unknown',
    img: 'Unknown',
    lat: 0,
    lng: 0,
  },
} as const;

export const MLB_STADIUM_LIST = Object.entries(MLB_STADIUM_MAP)
  .map(([key, stat]) => {
    return {
      ...stat,
      id: Number(key),
    };
  })
  .filter(s => s.id !== MlbTeam.FA);

export const MLB_DOME_LIST = MLB_STADIUM_LIST.filter(s =>
  [MlbTeam.Tor, MlbTeam.Ari, MlbTeam.TB, MlbTeam.Min, MlbTeam.Hou, MlbTeam.Mia, MlbTeam.Tex].includes(s.id)
);
