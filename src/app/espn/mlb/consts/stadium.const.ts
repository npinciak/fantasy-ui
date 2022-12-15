import { Ballpark } from '../models/ballpark.model';
import { MlbTeam } from './team.const';

// https://a.espncdn.com/redesign/assets/img/mlb/fields/5.png

export const MLB_STADIUM_MAP: { [key in MlbTeam.Team]: Ballpark } = {
  [MlbTeam.Team.LAA]: {
    team: 'Anaheim Angels',
    name: 'Edison International Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/edison_international_field.gif',
    lat: 33.799572,
    lng: -117.889031,
  },
  [MlbTeam.Team.Ari]: {
    team: 'Arizona Diamondbacks',
    name: 'Bankone Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/bank_one_ballpark.gif',
    lat: 33.452922,
    lng: -112.038669,
  },
  [MlbTeam.Team.Atl]: {
    team: 'Atlanta Braves',
    name: 'Turner Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/turner_field.gif',
    lat: 33.74691,
    lng: -84.391239,
  },
  [MlbTeam.Team.Bal]: {
    team: 'Baltimore Orioles',
    name: 'Camden Yards',
    img: 'https://www.baseball-almanac.com/stadium/directions/oriole_park_at_camden_yards.gif',
    lat: 39.285243,
    lng: -76.620103,
  },
  [MlbTeam.Team.Bos]: {
    team: 'Boston Red Sox',
    name: 'Fenway Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/fenway_park.gif',
    lat: 42.346613,
    lng: -71.098817,
  },
  [MlbTeam.Team.ChC]: {
    team: 'Chicago Cubs',
    name: 'Wrigley Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/wrigley_field.gif',
    lat: 41.947201,
    lng: -87.656413,
  },
  [MlbTeam.Team.ChW]: {
    team: 'Chicago White Sox',
    name: 'Guaranteed Rate Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/us_cellular_field.gif',
    lat: 41.830883,
    lng: -87.635083,
  },
  [MlbTeam.Team.Cin]: {
    team: 'Cincinnati Reds',
    name: 'Great American Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/great_american_ballpark.gif',
    lat: 39.107183,
    lng: -84.507713,
  },
  [MlbTeam.Team.Cle]: {
    team: 'Cleveland Indians',
    name: 'Progressive Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/jacobs_field.gif',
    lat: 41.495149,
    lng: -81.68709,
  },
  [MlbTeam.Team.Col]: {
    team: 'Colorado Rockies',
    name: 'Coors Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/coors_field.gif',
    lat: 39.75698,
    lng: -104.965329,
  },
  [MlbTeam.Team.Det]: {
    team: 'Detroit Tigers',
    name: 'Comerica Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/comerica_park.gif',
    lat: 42.346354,
    lng: -83.059619,
  },
  [MlbTeam.Team.Hou]: {
    team: 'Houston Astros',
    name: 'Minute Maid Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/minute_maid_park.gif',
    lat: 29.76045,
    lng: -95.369784,
  },
  [MlbTeam.Team.KC]: {
    team: 'Kansas City Royals',
    name: 'Kauffman Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/kauffman_stadium.gif',
    lat: 39.10222,
    lng: -94.583559,
  },
  [MlbTeam.Team.LAD]: {
    team: 'Los Angeles Dodgers',
    name: 'Dodger Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/dodger_stadium.gif',
    lat: 34.072437,
    lng: -118.246879,
  },
  [MlbTeam.Team.Mil]: {
    team: 'Milwaukee Brewers',
    name: 'Miller Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/miller_park.gif',
    lat: 43.04205,
    lng: -87.905599,
  },
  [MlbTeam.Team.Min]: {
    team: 'Minnesota Twins',
    name: 'Metrodome',
    img: 'https://www.baseball-almanac.com/stadium/directions/metrodome.gif',
    lat: 44.974346,
    lng: -93.259616,
  },
  [MlbTeam.Team.Wsh]: {
    team: 'Washington Nationals',
    name: 'Nationals Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/nationals_park.gif',
    lat: 38.87,
    lng: -77.01,
  },
  [MlbTeam.Team.NYM]: {
    team: 'New York Mets',
    name: 'Citi Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/citi-field.gif',
    lat: 40.75535,
    lng: -73.843219,
  },
  [MlbTeam.Team.NYY]: {
    team: 'New York Yankees',
    name: 'Yankee Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/yankee_stadium.gif',
    lat: 40.819782,
    lng: -73.929939,
  },
  [MlbTeam.Team.Oak]: {
    team: 'Oakland Athletics',
    name: 'Oakland Coliseum',
    img: 'https://www.baseball-almanac.com/stadium/directions/network_associates_coliseum.gif',
    lat: 37.74923,
    lng: -122.196487,
  },
  [MlbTeam.Team.Phi]: {
    team: 'Philadelphia Phillies',
    name: 'Citizens Bank Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/citizens_bank_ballpark.gif',
    lat: 39.952313,
    lng: -75.162392,
  },
  [MlbTeam.Team.Pit]: {
    team: 'Pittsburgh Pirates',
    name: 'PNC Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/PNC_park.gif',
    lat: 40.461503,
    lng: -80.008924,
  },
  [MlbTeam.Team.StL]: {
    team: 'St. Louis Cardinals',
    name: 'Busch Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/busch_stadium.gif',
    lat: 38.629683,
    lng: -90.188247,
  },
  [MlbTeam.Team.SD]: {
    team: 'San Diego Padres',
    name: 'Petco Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/petco_park.gif',
    lat: 32.752148,
    lng: -117.143635,
  },
  [MlbTeam.Team.SF]: {
    team: 'San Francisco Giants',
    name: 'Pacific Bell Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/pac_bell_park.gif',
    lat: 37.77987,
    lng: -122.389754,
  },
  [MlbTeam.Team.Sea]: {
    team: 'Seattle Mariners',
    name: 'Safeco Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/safeco_field.gif',
    lat: 47.60174,
    lng: -122.330829,
  },
  [MlbTeam.Team.TB]: {
    team: 'Tampa Bay Devil Rays',
    name: 'Tropicana Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/tropicana_field.gif',
    lat: 27.768487,
    lng: -82.648191,
  },
  [MlbTeam.Team.Tex]: {
    team: 'Texas Rangers',
    name: 'Ballpark in Arlington',
    img: 'https://www.baseball-almanac.com/stadium/directions/ballpark_in_arlington.gif',
    lat: 32.750156,
    lng: -97.081117,
  },
  [MlbTeam.Team.Tor]: {
    team: 'Toronto Blue Jays',
    name: 'Skydome',
    img: 'https://www.baseball-almanac.com/stadium/directions/skydome.gif',
    lat: 43.641653,
    lng: -79.3917,
  },
  [MlbTeam.Team.Mia]: {
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
};

export const MLB_STADIUM_LIST = Object.entries(MLB_STADIUM_MAP)
  .map(([key, stat]) => {
    return {
      ...stat,
      id: Number(key),
    };
  })
  .filter(s => s.id !== MlbTeam.Team.FA);

export const MLB_DOME_LIST = MLB_STADIUM_LIST.filter(s =>
  [MlbTeam.Team.Tor, MlbTeam.Team.Ari, MlbTeam.Team.TB, MlbTeam.Team.Min, MlbTeam.Team.Hou, MlbTeam.Team.Mia, MlbTeam.Team.Tex].includes(
    s.id
  )
);
