import { MLBTeam } from '../mlb.enums';

const mlbTeamMap = {
    0: 'FA',
    1: 'Bal',
    2: 'Bos',
    3: 'LAA',
    4: 'ChW',
    5: 'Cle',
    6: 'Det',
    7: 'KC',
    8: 'Mil',
    9: 'Min',
    10: 'NYY',
    11: 'Oak',
    12: 'Sea',
    13: 'Tex',
    14: 'Tor',
    15: 'Atl',
    16: 'ChC',
    17: 'Cin',
    18: 'Hou',
    19: 'LAD',
    20: 'Wsh',
    21: 'NYM',
    22: 'Phi',
    23: 'Pit',
    24: 'StL',
    25: 'SD',
    26: 'SF',
    27: 'Col',
    28: 'Mia',
    29: 'Ari',
    30: 'TB'
};

const mlbStadiumMap = {
    [MLBTeam.LAA]: {
        team: 'Anaheim Angels',
        name: 'Edison International Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/edison_international_field.gif',
        address: '2000 Gene Autry Way, Anaheim, CA. 92806',
        lat: 33.799572,
        lng: -117.889031
    },
    [MLBTeam.Ari]: {
        team: 'Arizona Diamondbacks',
        name: 'Bankone Ballpark',
        img: 'https://www.baseball-almanac.com/stadium/directions/bank_one_ballpark.gif',
        address: 'P.O. Box 2095, Phoenix, AZ. 85001',
        lat: 33.452922,
        lng: -112.038669
    },
    [MLBTeam.Atl]: {
        team: 'Atlanta Braves',
        name: 'Turner Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/turner_field.gif',
        address: 'P.O. Box 4064, Atlanta, GA. 30302',
        lat: 33.74691,
        lng: -84.391239
    },
    [MLBTeam.Bal]: {
        team: 'Baltimore Orioles',
        name: 'Camden Yards',
        img: 'https://www.baseball-almanac.com/stadium/directions/oriole_park_at_camden_yards.gif',
        address: '333 W. Camden Street, Baltimore, MD. 21201',
        lat: 39.285243,
        lng: -76.620103
    },
    [MLBTeam.Bos]: {
        team: 'Boston Red Sox',
        name: 'Fenway Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/fenway_park.gif',
        address: '4 Yawkey Way, Boston, MA 02215',
        lat: 42.346613,
        lng: -71.098817
    },
    [MLBTeam.ChC]: {
        team: 'Chicago Cubs',
        name: 'Wrigley Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/wrigley_field.gif',
        address: '1060 Addison Street, Chicago, IL 60616',
        lat: 41.947201,
        lng: -87.656413
    },
    [MLBTeam.ChW]: {
        team: 'Chicago White Sox',
        name: 'Guaranteed Rate Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/us_cellular_field.gif',
        address: '333 W. 35th Street, Chicago, IL 60616',
        lat: 41.830883,
        lng: -87.635083
    },
    [MLBTeam.Cin]: {
        team: 'Cincinnati Reds',
        name: 'Great American Ballpark',
        img: 'https://www.baseball-almanac.com/stadium/directions/great_american_ballpark.gif',
        address: '100 Cinergy Field, Cincinnati, OH 45202',
        lat: 39.107183,
        lng: -84.507713
    },
    [MLBTeam.Cle]: {
        team: 'Cleveland Indians',
        name: 'Progressive Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/jacobs_field.gif',
        address: '2401 Ontario Street, Cleveland, OH 44115',
        lat: 41.495149,
        lng: -81.68709
    },
    [MLBTeam.Col]: {
        team: 'Colorado Rockies',
        name: 'Coor Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/coors_field.gif',
        address: 'Coors Field, 2001 Blake Street, Denver, CO 80205-2000',
        lat: 39.75698,
        lng: -104.965329
    },
    [MLBTeam.Det]: {
        team: 'Detroit Tigers',
        name: 'Comerica Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/comerica_park.gif',
        address: 'Comerica Park, 2100 Woodward Ave., Detroit, MI 48201',
        lat: 42.346354,
        lng: -83.059619
    },
    [MLBTeam.Hou]: {
        team: 'Houston Astros',
        name: 'Minute Maid Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/minute_maid_park.gif',
        address: 'P.O. Box 288, Houston, TX 77001-0288',
        lat: 29.76045,
        lng: -95.369784
    },
    [MLBTeam.KC]: {
        team: 'Kansas City Royals',
        name: 'Kauffman Stadium',
        img: 'https://www.baseball-almanac.com/stadium/directions/kauffman_stadium.gif',
        address: 'P.O. Boz 419969, Kansas City, MO 64141',
        lat: 39.10222,
        lng: -94.583559
    },
    [MLBTeam.LAD]: {
        team: 'Los Angeles Dodgers',
        name: 'Dodger Stadium',
        img: 'https://www.baseball-almanac.com/stadium/directions/dodger_stadium.gif',
        address: '1000 Elysian Park Ave., Los Angeles, CA 90012',
        lat: 34.072437,
        lng: -118.246879
    },
    [MLBTeam.Mil]: {
        team: 'Milwaukee Brewers',
        name: 'Miller Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/miller_park.gif',
        address: 'P.O. Box 3099, Milwaukee, WI 53201-3099',
        lat: 43.04205,
        lng: -87.905599
    },
    [MLBTeam.Min]: {
        team: 'Minnesota Twins',
        name: 'Metrodome',
        img: 'https://www.baseball-almanac.com/stadium/directions/metrodome.gif',
        address: '501 Chicago Ave. S., Minneapolis, MN 55415',
        lat: 44.974346,
        lng: -93.259616
    },
    [MLBTeam.Wsh]: {
        team: 'Washington Nationals',
        name: 'Nationals Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/nationals_park.gif',
        address: '1500 South Capitol Street SE, Washington, DC',
        lat: 38.87,
        lng: -77.01
    },
    [MLBTeam.NYM]: {
        team: 'New York Mets',
        name: 'Citi Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/citi-field.gif',
        address: 'Roosevelt Ave & 126th Street, New York, NY 11368',
        lat: 40.75535,
        lng: -73.843219
    },
    [MLBTeam.NYY]: {
        team: 'New York Yankees',
        name: 'Yankee Stadium',
        img: 'https://www.baseball-almanac.com/stadium/directions/yankee_stadium.gif',
        address: 'E. 161 Street & River Ave., New York, NY 10451',
        lat: 40.819782,
        lng: -73.929939
    },
    [MLBTeam.Oak]: {
        team: 'Oakland Athletics',
        name: 'Oakland Coliseum',
        img: 'https://www.baseball-almanac.com/stadium/directions/network_associates_coliseum.gif',
        address: 'Oakland Coliseum, 700 Coliseum Way, Oakland, Ca 94621-1918',
        lat: 37.74923,
        lng: -122.196487
    },
    [MLBTeam.Phi]: {
        team: 'Philadelphia Phillies',
        name: 'Citizens Bank Ballpark',
        img: 'https://www.baseball-almanac.com/stadium/directions/citizens_bank_ballpark.gif',
        address: 'P.O. Box 7575, Philadelphia, PA 19101',
        lat: 39.952313,
        lng: -75.162392
    },
    [MLBTeam.Pit]: {
        team: 'Pittsburgh Pirates',
        name: 'PNC Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/PNC_park.gif',
        address: '600 Stadium Circle, Pittsburgh, PA 15212',
        lat: 40.461503,
        lng: -80.008924
    },
    [MLBTeam.StL]: {
        team: 'St. Louis Cardinals',
        name: 'Busch Stadium',
        img: 'https://www.baseball-almanac.com/stadium/directions/busch_stadium.gif',
        address: '250 Stadium Plaza, St. Louis, MO 63102',
        lat: 38.629683,
        lng: -90.188247
    },
    [MLBTeam.SD]: {
        team: 'San Diego Padres',
        name: 'Petco Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/petco_park.gif',
        address: 'P.O. Box 2000, San Diego, CA 92112-2000',
        lat: 32.752148,
        lng: -117.143635
    },
    [MLBTeam.SF]: {
        team: 'San Francisco Giants',
        name: 'Pacific Bell Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/pac_bell_park.gif',
        address: '24 Willie Mays Plaza, San Francisco, CA 94107',
        lat: 37.77987,
        lng: -122.389754
    },
    [MLBTeam.Sea]: {
        team: 'Seattle Mariners',
        name: 'Safeco Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/safeco_field.gif',
        address: 'P.O. Box 41000, 411 First Ave. S., Seattle, WA 98104',
        lat: 47.60174,
        lng: -122.330829
    },
    [MLBTeam.TB]: {
        team: 'Tampa Bay Devil Rays',
        name: 'Tropicana Field',
        img: 'https://www.baseball-almanac.com/stadium/directions/tropicana_field.gif',
        address: '1 Tropicana Drive, St. Petersburg, FL 33705',
        lat: 27.768487,
        lng: -82.648191
    },
    [MLBTeam.Tex]: {
        team: 'Texas Rangers',
        name: 'Ballpark in Arlington',
        img: 'https://www.baseball-almanac.com/stadium/directions/ballpark_in_arlington.gif',
        address: '1000 Ballpark Way, Arlington, TX 76011',
        lat: 32.750156,
        lng: -97.081117
    },
    [MLBTeam.Tor]: {
        team: 'Toronto Blue Jays',
        name: 'Skydome',
        img: 'https://www.baseball-almanac.com/stadium/directions/skydome.gif',
        address: '1 Blue Jay Way, Suite 3200, Toronto, ONT M5V 1J1',
        lat: 43.641653,
        lng: -79.3917
    },
    [MLBTeam.Mia]: {
        team: 'Miami Marlins',
        name: 'Pro Player Park',
        img: 'https://www.baseball-almanac.com/stadium/directions/pro_player_park.gif'
    }
};

export { mlbTeamMap, mlbStadiumMap };
