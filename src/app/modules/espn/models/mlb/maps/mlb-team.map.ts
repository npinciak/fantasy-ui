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
    3: {
        team: 'Anaheim Angels',
        address: '2000 Gene Autry Way, Anaheim, CA. 92806',
        lat: 33.799572,
        lng: -117.889031
    },
    29: {
        team: 'Arizona Diamondbacks',
        address: 'P.O. Box 2095, Phoenix, AZ. 85001',
        lat: 33.452922,
        lng: -112.038669
    },
    15: {
        team: 'Atlanta Braves',
        address: 'P.O. Box 4064, Atlanta, GA. 30302',
        lat: 33.74691,
        lng: -84.391239
    },
    1: {
        team: 'Baltimore Orioles',
        address: '333 W. Camden Street, Baltimore, MD. 21201',
        lat: 39.285243,
        lng: -76.620103
    },
    2: {
        team: 'Boston Red Sox',
        address: '4 Yawkey Way, Boston, MA 02215',
        lat: 42.346613,
        lng: -71.098817
    },
    16: {
        team: 'Chicago Cubs',
        address: '1060 Addison Street, Chicago, IL 60616',
        lat: 41.947201,
        lng: -87.656413
    },
    4: {
        team: 'Chicago White Sox',
        address: '333 W. 35th Street, Chicago, IL 60616',
        lat: 41.830883,
        lng: -87.635083
    },
    17: {
        team: 'Cincinnati Reds',
        address: '100 Cinergy Field, Cincinnati, OH 45202',
        lat: 39.107183,
        lng: -84.507713
    },
    5: {
        team: 'Cleveland Indians',
        address: '2401 Ontario Street, Cleveland, OH 44115',
        lat: 41.495149,
        lng: -81.68709
    },
    27: {
        team: 'Colorado Rockies',
        address: 'Coors Field, 2001 Blake Street, Denver, CO 80205-2000',
        lat: 39.75698,
        lng: -104.965329
    },
    6: {
        team: 'Detroit Tigers',
        address: 'Comerica Park, 2100 Woodward Ave., Detroit, MI 48201',
        lat: 42.346354,
        lng: -83.059619
    },
    18: {
        team: 'Houston Astros',
        address: 'P.O. Box 288, Houston, TX 77001-0288',
        lat: 29.76045,
        lng: -95.369784
    },
    7: {
        team: 'Kansas City Royals',
        address: 'P.O. Boz 419969, Kansas City, MO 64141',
        lat: 39.10222,
        lng: -94.583559
    },
    19: {
        team: 'Los Angeles Dodgers',
        address: '1000 Elysian Park Ave., Los Angeles, CA 90012',
        lat: 34.072437,
        lng: -118.246879
    },
    8: {
        team: 'Milwaukee Brewers',
        address: 'P.O. Box 3099, Milwaukee, WI 53201-3099',
        lat: 43.04205,
        lng: -87.905599
    },
    9: {
        team: 'Minnesota Twins',
        address: '501 Chicago Ave. S., Minneapolis, MN 55415',
        lat: 44.974346,
        lng: -93.259616
    },
    20: {
        team: 'Washington Nationals',
        address: '1500 South Capitol Street SE, Washington, DC',
        lat: 38.87,
        lng: -77.01
    },
    21: {
        team: 'New York Mets',
        address: 'Roosevelt Ave & 126th Street, New York, NY 11368',
        lat: 40.75535,
        lng: -73.843219
    },
    10: {
        team: 'New York Yankees',
        address: 'Yankee Stadium, E. 161 Street & River Ave., New York, NY 10451',
        lat: 40.819782,
        lng: -73.929939
    },
    11: {
        team: 'Oakland Athletics',
        address: 'Oakland Coliseum, 700 Coliseum Way, Oakland, Ca 94621-1918',
        lat: 37.74923,
        lng: -122.196487
    },
    22: {
        team: 'Philadelphia Phillies',
        address: 'P.O. Box 7575, Philadelphia, PA 19101',
        lat: 39.952313,
        lng: -75.162392
    },
    23: {
        team: 'Pittsburgh Pirates',
        address: '600 Stadium Circle, Pittsburgh, PA 15212',
        lat: 40.461503,
        lng: -80.008924
    },
    24: {
        team: 'St. Louis Cardinals',
        address: '250 Stadium Plaza, St. Louis, MO 63102',
        lat: 38.629683,
        lng: -90.188247
    },
    25: {
        team: 'San Diego Padres',
        address: 'P.O. Box 2000, San Diego, CA 92112-2000',
        lat: 32.752148,
        lng: -117.143635
    },
    26: {
        team: 'San Francisco Giants',
        address: 'Pacific Bell Park, 24 Willie Mays Plaza, San Francisco, CA 94107',
        lat: 37.77987,
        lng: -122.389754
    },
    12: {
        team: 'Seattle Mariners',
        address: 'P.O. Box 41000, 411 First Ave. S., Seattle, WA 98104',
        lat: 47.60174,
        lng: -122.330829
    },
    30: {
        team: 'Tampa Bay Devil Rays',
        address: '1 Tropicana Drive, St. Petersburg, FL 33705',
        lat: 27.768487,
        lng: -82.648191
    },
    13: {
        team: 'Texas Rangers',
        address: '1000 Ballpark Way, Arlington, TX 76011',
        lat: 32.750156,
        lng: -97.081117
    },
    14: {
        team: 'Toronto Blue Jays',
        address: '1 Blue Jay Way, Suite 3200, Toronto, ONT M5V 1J1',
        lat: 43.641653,
        lng: -79.3917
    }
    // {
    //     team: 'Florida Marlins',
    //     address: '2269 NW 199th Street, Miami, FL 33056',
    //     lat: 25.954428,
    //     lng: -80.238164
    // },
};


export { mlbTeamMap, mlbStadiumMap };

