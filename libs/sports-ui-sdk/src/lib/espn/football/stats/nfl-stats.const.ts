import { FootballStat } from './nfl-stats.model';

export const NFL_STATS_MAP = {
  [FootballStat.PA]: { abbrev: 'PA', id: '0', description: 'Each Pass Attempted' },
  [FootballStat.PC]: { abbrev: 'PC', id: '1', description: 'Each Pass Completed' },
  [FootballStat.INC]: { abbrev: 'INC', id: '2', description: 'Each Incomplete Pass' },
  [FootballStat.PY]: { abbrev: 'PY', id: '3', description: 'Passing Yards' },
  [FootballStat.PTD]: { abbrev: 'PTD', id: '4', description: 'TD Pass' },
  [FootballStat.PY5]: { abbrev: 'PY5', id: '5', description: 'Every 5 passing yards' },
  [FootballStat.PY10]: { abbrev: 'PY10', id: '6', description: 'Every 10 passing yards' },
  [FootballStat.PY20]: { abbrev: 'PY20', id: '7', description: 'Every 20 passing yards ' },
  [FootballStat.PY25]: { abbrev: 'PY25', id: '8', description: 'Every 25 passing yards ' },
  [FootballStat.PY50]: { abbrev: 'PY50', id: '9', description: 'Every 50 passing yards' },
  [FootballStat.PY100]: { abbrev: 'PY100', id: '10', description: 'Every 100 passing yards' },
  [FootballStat.PC5]: { abbrev: 'PC5', id: '11', description: 'Every 5 pass completions' },
  [FootballStat.PC10]: { abbrev: 'PC10', id: '12', description: 'Every 10 pass completions' },
  [FootballStat.IP5]: { abbrev: 'IP5', id: '13', description: 'Every 5 pass incompletions' },
  [FootballStat.IP10]: { abbrev: 'IP10', id: '14', description: 'Every 10 pass incompletions' },
  [FootballStat.PTD40]: { abbrev: 'PTD40', id: '15', description: '40+ yard TD pass bonus' },
  [FootballStat.PTD50]: { abbrev: 'PTD50', id: '16', description: '50+ yard TD pass bonus' },
  [FootballStat.P300]: { abbrev: 'P300', id: '17', description: '300-399 yard passing game' },
  [FootballStat.P400]: { abbrev: 'P400', id: '18', description: '400+ yard passing game' },
  [FootballStat.TWOPTCONVPASS]: { abbrev: '2PC', id: '19', description: '2pt Passing Conversion' },
  [FootballStat.INTT]: { abbrev: 'INTT', id: '20', description: 'Interceptions Thrown' },
  [FootballStat.CPCT]: { abbrev: 'CPCT', id: '21', description: 'Passing Completion Pct' },
  [FootballStat.PYPG]: { abbrev: 'PYPG', id: '22', description: 'Passing Yards Per Game' },
  [FootballStat.RA]: { abbrev: 'RA', id: '23', description: 'Rushing Attempts' },
  [FootballStat.RY]: { abbrev: 'RY', id: '24', description: 'Rushing Yards' },
  [FootballStat.RTD]: { abbrev: 'RTD', id: '25', description: 'TD Rush' },
  [FootballStat.TWOPTCONVRUN]: { abbrev: '2PR', id: '26', description: '2pt Rushing Conversion' },
  [FootballStat.RY5]: { abbrev: 'RY5', id: '27', description: 'Every 5 rushing yards' },
  [FootballStat.RY10]: { abbrev: 'RY10', id: '28', description: 'Every 10 rushing yards' },
  [FootballStat.RY20]: { abbrev: 'RY20', id: '29', description: 'Every 20 rushing yards' },
  [FootballStat.RY25]: { abbrev: 'RY25', id: '30', description: 'Every 25 rushing yards ' },
  [FootballStat.RY50]: { abbrev: 'RY50', id: '31', description: 'Every 50 rushing yards' },
  [FootballStat.R100]: { abbrev: 'R100', id: '32', description: 'Every 100 rushing yards' },
  [FootballStat.RA5]: { abbrev: 'RA5', id: '33', description: 'Every 5 rush attempts' },
  [FootballStat.RA10]: { abbrev: 'RA10', id: '34', description: 'Every 10 rush attempts' },
  [FootballStat.RTD40]: { abbrev: 'RTD40', id: '35', description: '40+ yard TD rush bonus' },
  [FootballStat.RTD50]: { abbrev: 'RTD50', id: '36', description: '50+ yard TD rush bonus' },
  [FootballStat.RY100]: { abbrev: 'RY100', id: '37', description: '100-199 yard rushing game' },
  [FootballStat.RY200]: { abbrev: 'RY200', id: '38', description: '200+ yard rushing game' },
  [FootballStat.RYPA]: { abbrev: 'RYPA', id: '39', description: 'Rushing Yards Per Attempt' },
  [FootballStat.RYPG]: { abbrev: 'RYPG', id: '40', description: 'Rushing Yards Per Game' },
  [FootballStat.RECS]: { abbrev: 'RECS', id: '41', description: 'Receptions' },
  [FootballStat.REY]: { abbrev: 'REY', id: '42', description: 'Receiving Yards' },
  [FootballStat.RETD]: { abbrev: 'RETD', id: '43', description: 'TD Reception' },
  [FootballStat.TWOPTCONVREC]: { abbrev: '2PRE', id: '44', description: '2pt Receiving Conversion' },
  [FootballStat.RETD40]: { abbrev: 'RETD40', id: '45', description: '40+ yard TD rec bonus' },
  [FootballStat.RETD50]: { abbrev: 'RETD50', id: '46', description: '50+ yard TD rec bonus' },
  [FootballStat.REY5]: { abbrev: 'REY5', id: '47', description: 'Every 5 receiving yards' },
  [FootballStat.REY10]: { abbrev: 'REY10', id: '48', description: 'Every 10 receiving yards' },
  [FootballStat.REY20]: { abbrev: 'REY20', id: '49', description: 'Every 20 receiving yards' },
  [FootballStat.REY25]: { abbrev: 'REY25', id: '50', description: 'Every 25 receiving yards' },
  [FootballStat.REY50]: { abbrev: 'REY50', id: '51', description: 'Every 50 receiving yards' },
  [FootballStat.RE100]: { abbrev: 'RE100', id: '52', description: 'Every 100 receiving yards' },
  [FootballStat.REC]: { abbrev: 'REC', id: '53', description: 'Each reception' },
  [FootballStat.REC5]: { abbrev: 'REC5', id: '54', description: 'Every 5 receptions' },
  [FootballStat.REC10]: { abbrev: 'REC10', id: '55', description: 'Every 10 receptions' },
  [FootballStat.REY100]: { abbrev: 'REY100', id: '56', description: '100-199 yard receiving game' },
  [FootballStat.REY200]: { abbrev: 'REY200', id: '57', description: '200+ yard receiving game' },
  [FootballStat.RET]: { abbrev: 'RET', id: '58', description: 'Receiving Target' },
  [FootballStat.YAC]: { abbrev: 'YAC', id: '59', description: 'Receiving Yards After Catch' },
  [FootballStat.YPC]: { abbrev: 'YPC', id: '60', description: 'Receiving Yards Per Catch' },
  [FootballStat.REYPG]: { abbrev: 'REYPG', id: '61', description: 'Receiving Yards Per Game' },
  [FootballStat.PTL]: { abbrev: 'PTL', id: '62', description: 'Total 2pt Conversions' },
  [FootballStat.FTD]: { abbrev: 'FTD', id: '63', description: 'Fumble Recovered for TD' },
  [FootballStat.SKD]: { abbrev: 'SKD', id: '64', description: 'Sacked' },
  [FootballStat.PFUM]: { abbrev: 'PFUM', id: '65', description: 'Passing Fumbles' },
  [FootballStat.RFUM]: { abbrev: 'RFUM', id: '66', description: 'Rushing Fumbles' },
  [FootballStat.REFUM]: { abbrev: 'REFUM', id: '67', description: 'Receiving Fumbles' },
  [FootballStat.FUM]: { abbrev: 'FUM', id: '68', description: 'Total Fumbles' },
  [FootballStat.PFUML]: { abbrev: 'PFUML', id: '69', description: 'Passing Fumbles Lost' },
  [FootballStat.RFUML]: { abbrev: 'RFUML', id: '70', description: 'Rushing Fumbles Lost' },
  [FootballStat.REFUML]: { abbrev: 'REFUML', id: '71', description: 'Receiving Fumbles Lost' },
  [FootballStat.FUML]: { abbrev: 'FUML', id: '72', description: 'Total Fumbles Lost' },
  [FootballStat.TT]: { abbrev: 'TT', id: '73', description: 'Total Turnovers' },
  [FootballStat.FG50P]: { abbrev: 'FG50P', id: '74', description: 'FG Made (50+ yards)' },
  [FootballStat.FGA50P]: { abbrev: 'FGA50P', id: '75', description: 'FG Attempted (50+ yards)' },
  [FootballStat.FGM50P]: { abbrev: 'FGM50P', id: '76', description: 'FG Missed (50+ yards)' },
  [FootballStat.FG40]: { abbrev: 'FG40', id: '77', description: 'FG Made (40-49 yards)' },
  [FootballStat.FGA40]: { abbrev: 'FGA40', id: '78', description: 'FG Attempted (40-49 yards)' },
  [FootballStat.FGM40]: { abbrev: 'FGM40', id: '79', description: 'FG Missed (40-49 yards)' },
  [FootballStat.FG0]: { abbrev: 'FG0', id: '80', description: 'FG Made (0-39 yards)' },
  [FootballStat.FGA0]: { abbrev: 'FGA0', id: '81', description: 'FG Attempted (0-39 yards)' },
  [FootballStat.FGM0]: { abbrev: 'FGM0', id: '82', description: 'FG Missed (0-39 yards)' },
  [FootballStat.FG]: { abbrev: 'FG', id: '83', description: 'Total FG Made' },
  [FootballStat.FGA]: { abbrev: 'FGA', id: '84', description: 'Total FG Attempted' },
  [FootballStat.FGM]: { abbrev: 'FGM', id: '85', description: 'Total FG Missed' },
  [FootballStat.PAT]: { abbrev: 'PAT', id: '86', description: 'Each PAT Made' },
  [FootballStat.PATA]: { abbrev: 'PATA', id: '87', description: 'Each PAT Attempted' },
  [FootballStat.PATM]: { abbrev: 'PATM', id: '88', description: 'Each PAT Missed' },
  [FootballStat.PA0]: { abbrev: 'PA0', id: '89', description: '0 points allowed' },
  [FootballStat.PA1]: { abbrev: 'PA1', id: '90', description: '1-6 points allowed' },
  [FootballStat.PA7]: { abbrev: 'PA7', id: '91', description: '7-13 points allowed' },
  [FootballStat.PA14]: { abbrev: 'PA14', id: '92', description: '14-17 points allowed' },
  [FootballStat.BLKKRTD]: { abbrev: 'BLKKRTD', id: '93', description: 'Blocked Punt or FG return for TD' },
  [FootballStat.DEFRETTD]: { abbrev: 'DEFRETTD', id: '94', description: 'Fumble or INT Return for TD' },
  [FootballStat.INT]: { abbrev: 'INT', id: '95', description: 'Each Interception' },
  [FootballStat.FR]: { abbrev: 'FR', id: '96', description: 'Each Fumble Recovered' },
  [FootballStat.BLKK]: { abbrev: 'BLKK', id: '97', description: 'Blocked Punt, PAT or FG' },
  [FootballStat.SF]: { abbrev: 'SF', id: '98', description: 'Each Safety' },
  [FootballStat.SK]: { abbrev: 'SK', id: '99', description: 'Each Sack' },
  [FootballStat.HALFSK]: { abbrev: 'HALFSK', id: '100', description: '1/2 Sack' },
  [FootballStat.KRTD]: { abbrev: 'KRTD', id: '101', description: 'Kickoff Return TD' },
  [FootballStat.PRTD]: { abbrev: 'PRTD', id: '102', description: 'Punt Return TD' },
  [FootballStat.INTTD]: { abbrev: 'INTTD', id: '103', description: 'Interception Return TD' },
  [FootballStat.FRTD]: { abbrev: 'FRTD', id: '104', description: 'Fumble Return TD' },
  [FootballStat.TRTD]: { abbrev: 'TRTD', id: '105', description: 'Total Return TD' },
  [FootballStat.FF]: { abbrev: 'FF', id: '106', description: 'Each Fumble Forced' },
  [FootballStat.TKA]: { abbrev: 'TKA', id: '107', description: 'Assisted Tackles' },
  [FootballStat.TKS]: { abbrev: 'TKS', id: '108', description: 'Solo Tackles' },
  [FootballStat.TK]: { abbrev: 'TK', id: '109', description: 'Total Tackles' },
  [FootballStat.TK3]: { abbrev: 'TK3', id: '110', description: 'Every 3 Total Tackles' },
  [FootballStat.TK5]: { abbrev: 'TK5', id: '111', description: 'Every 5 Total Tackles' },
  [FootballStat.STF]: { abbrev: 'STF', id: '112', description: 'Stuffs' },
  [FootballStat.PD]: { abbrev: 'PD', id: '113', description: 'Passes Defensed' },
  [FootballStat.KR]: { abbrev: 'KR', id: '114', description: 'Kickoff Return Yards' },
  [FootballStat.PR]: { abbrev: 'PR', id: '115', description: 'Punt Return Yards' },
  [FootballStat.KR10]: { abbrev: 'KR10', id: '116', description: 'Every 10 kickoff return yards' },
  [FootballStat.KR25]: { abbrev: 'KR25', id: '117', description: 'Every 25 kickoff return yards' },
  [FootballStat.PR10]: { abbrev: 'PR10', id: '118', description: 'Every 10 punt return yards' },
  [FootballStat.PR25]: { abbrev: 'PR25', id: '119', description: 'Every 25 punt return yards' },
  [FootballStat.PTSA]: { abbrev: 'PTSA', id: '120', description: 'Points Allowed' },
  [FootballStat.PA18]: { abbrev: 'PA18', id: '121', description: '18-21 points allowed' },
  [FootballStat.PA22]: { abbrev: 'PA22', id: '122', description: '22-27 points allowed' },
  [FootballStat.PA28]: { abbrev: 'PA28', id: '123', description: '28-34 points allowed' },
  [FootballStat.PA35]: { abbrev: 'PA35', id: '124', description: '35-45 points allowed' },
  [FootballStat.PA46]: { abbrev: 'PA46', id: '125', description: '46+ points allowed' },
  [FootballStat.PAPG]: { abbrev: 'PAPG', id: '126', description: 'Points Allowed Per Game' },
  [FootballStat.YA]: { abbrev: 'YA', id: '127', description: 'Yards Allowed' },
  [FootballStat.YA100]: { abbrev: 'YA100', id: '128', description: 'Less than 100 total yards allowed' },
  [FootballStat.YA199]: { abbrev: 'YA199', id: '129', description: '100-199 total yards allowed' },
  [FootballStat.YA299]: { abbrev: 'YA299', id: '130', description: '200-299 total yards allowed' },
  [FootballStat.YA349]: { abbrev: 'YA349', id: '131', description: '300-349 total yards allowed' },
  [FootballStat.YA399]: { abbrev: 'YA399', id: '132', description: '350-399 total yards allowed' },
  [FootballStat.YA449]: { abbrev: 'YA449', id: '133', description: '400-449 total yards allowed' },
  [FootballStat.YA499]: { abbrev: 'YA499', id: '134', description: '450-499 total yards allowed' },
  [FootballStat.YA549]: { abbrev: 'YA549', id: '135', description: '500-549 total yards allowed' },
  [FootballStat.YA550]: { abbrev: 'YA550', id: '136', description: '550+ total yards allowed' },
  [FootballStat.YAPG]: { abbrev: 'YAPG', id: '137', description: 'Yards Allowed Per Game' },
  [FootballStat.PT]: { abbrev: 'PT', id: '138', description: 'Net Punts' },
  [FootballStat.PTY]: { abbrev: 'PTY', id: '139', description: 'Punt Yards' },
  [FootballStat.PT10]: { abbrev: 'PT10', id: '140', description: 'Punts Inside the 10' },
  [FootballStat.PT20]: { abbrev: 'PT20', id: '141', description: 'Punts Inside the 20' },
  [FootballStat.PTB]: { abbrev: 'PTB', id: '142', description: 'Blocked Punts' },
  [FootballStat.PTR]: { abbrev: 'PTR', id: '143', description: 'Punts Returned' },
  [FootballStat.PTRY]: { abbrev: 'PTRY', id: '144', description: 'Punt Return Yards' },
  [FootballStat.PTTB]: { abbrev: 'PTTB', id: '145', description: 'Touchbacks' },
  [FootballStat.PTFC]: { abbrev: 'PTFC', id: '146', description: 'Fair Catches' },
  [FootballStat.PTAVG]: { abbrev: 'PTAVG', id: '147', description: 'Punt Average' },
  [FootballStat.PTA44]: { abbrev: 'PTA44', id: '148', description: 'Punt Average 44.0+' },
  [FootballStat.PTA42]: { abbrev: 'PTA42', id: '149', description: 'Punt Average 42.0-43.9' },
  [FootballStat.PTA40]: { abbrev: 'PTA40', id: '150', description: 'Punt Average 40.0-41.9' },
  [FootballStat.PTA38]: { abbrev: 'PTA38', id: '151', description: 'Punt Average 38.0-39.9' },
  [FootballStat.PTA36]: { abbrev: 'PTA36', id: '152', description: 'Punt Average 36.0-37.9' },
  [FootballStat.PTA34]: { abbrev: 'PTA34', id: '153', description: 'Punt Average 34.0-35.9' },
  [FootballStat.PTA33]: { abbrev: 'PTA33', id: '154', description: 'Punt Average 33.9 or less' },
  [FootballStat.TW]: { abbrev: 'TW', id: '155', description: 'Team Win' },
  [FootballStat.TL]: { abbrev: 'TL', id: '156', description: 'Team Loss' },
  [FootballStat.TIE]: { abbrev: 'TIE', id: '157', description: 'Team Tie' },
  [FootballStat.PTS]: { abbrev: 'PTS', id: '158', description: 'Points Scored' },
  [FootballStat.PPG]: { abbrev: 'PPG', id: '159', description: 'Points Scored Per Game' },
  [FootballStat.MGN]: { abbrev: 'MGN', id: '160', description: 'Margin of Victory' },
  [FootballStat.WM25]: { abbrev: 'WM25', id: '161', description: '25+ point Win Margin' },
  [FootballStat.WM20]: { abbrev: 'WM20', id: '162', description: '20-24 point Win Margin' },
  [FootballStat.WM15]: { abbrev: 'WM15', id: '163', description: '15-19 point Win Margin' },
  [FootballStat.WM10]: { abbrev: 'WM10', id: '164', description: '10-14 point Win Margin' },
  [FootballStat.WM5]: { abbrev: 'WM5', id: '165', description: '5-9 point Win Margin' },
  [FootballStat.WM1]: { abbrev: 'WM1', id: '166', description: '1-4 point Win Margin' },
  [FootballStat.LM1]: { abbrev: 'LM1', id: '167', description: '1-4 point Loss Margin' },
  [FootballStat.LM5]: { abbrev: 'LM5', id: '168', description: '5-9 point Loss Margin' },
  [FootballStat.LM10]: { abbrev: 'LM10', id: '169', description: '10-14 point Loss Margin' },
  [FootballStat.LM15]: { abbrev: 'LM15', id: '170', description: '15-19 point Loss Margin' },
  [FootballStat.LM20]: { abbrev: 'LM20', id: '171', description: '20-24 point Loss Margin' },
  [FootballStat.LM25]: { abbrev: 'LM25', id: '172', description: '25+ point Loss Margin' },
  [FootballStat.MGNPG]: { abbrev: 'MGNPG', id: '173', description: 'Margin of Victory Per Game' },
  [FootballStat.WINPCT]: { abbrev: 'WINPCT', id: '174', description: 'Winning Pct' },
  [FootballStat.PTD0]: { abbrev: 'PTD0', id: '175', description: '0-9 yd TD pass bonus' },
  [FootballStat.PTD10]: { abbrev: 'PTD10', id: '176', description: '10-19 yd TD pass bonus' },
  [FootballStat.PTD20]: { abbrev: 'PTD20', id: '177', description: '20-29 yd TD pass bonus' },
  [FootballStat.PTD30]: { abbrev: 'PTD30', id: '178', description: '30-39 yd TD pass bonus' },
  [FootballStat.RTD0]: { abbrev: 'RTD0', id: '179', description: '0-9 yd TD rush bonus' },
  [FootballStat.RTD10]: { abbrev: 'RTD10', id: '180', description: '10-19 yd TD rush bonus' },
  [FootballStat.RTD20]: { abbrev: 'RTD20', id: '181', description: '20-29 yd TD rush bonus' },
  [FootballStat.RTD30]: { abbrev: 'RTD30', id: '182', description: '30-39 yd TD rush bonus' },
  [FootballStat.RETD0]: { abbrev: 'RETD0', id: '183', description: '0-9 yd TD rec bonus' },
  [FootballStat.RETD10]: { abbrev: 'RETD10', id: '184', description: '10-19 yd TD rec bonus' },
  [FootballStat.RETD20]: { abbrev: 'RETD20', id: '185', description: '20-29 yd TD rec bonus' },
  [FootballStat.RETD30]: { abbrev: 'RETD30', id: '186', description: '30-39 yd TD rec bonus' },
  [FootballStat.DPTSA]: { abbrev: 'DPTSA', id: '187', description: 'D/ST Points Allowed' },
  [FootballStat.DPA0]: { abbrev: 'DPA0', id: '188', description: 'D/ST 0 points allowed' },
  [FootballStat.DPA1]: { abbrev: 'DPA1', id: '189', description: 'D/ST 1-6 points allowed' },
  [FootballStat.DPA7]: { abbrev: 'DPA7', id: '190', description: 'D/ST 7-13 points allowed' },
  [FootballStat.DPA14]: { abbrev: 'DPA14', id: '191', description: 'D/ST 14-17 points allowed' },
  [FootballStat.DPA18]: { abbrev: 'DPA18', id: '192', description: 'D/ST 18-21 points allowed' },
  [FootballStat.DPA22]: { abbrev: 'DPA22', id: '193', description: 'D/ST 22-27 points allowed' },
  [FootballStat.DPA28]: { abbrev: 'DPA28', id: '194', description: 'D/ST 28-34 points allowed' },
  [FootballStat.DPA35]: { abbrev: 'DPA35', id: '195', description: 'D/ST 35-45 points allowed' },
  [FootballStat.DPA46]: { abbrev: 'DPA46', id: '196', description: 'D/ST 46+ points allowed' },
  [FootballStat.DPAPG]: { abbrev: 'DPAPG', id: '197', description: 'D/ST Points Allowed Per Game' },
  [FootballStat.FG50]: { abbrev: 'FG50', id: '198', description: 'FG Made (50-59 yards)' },
  [FootballStat.FGA50]: { abbrev: 'FGA50', id: '199', description: 'FG Attempted (50-59 yards)' },
  [FootballStat.FGM50]: { abbrev: 'FGM50', id: '200', description: 'FG Missed (50-59 yards)' },
  [FootballStat.FG60]: { abbrev: 'FG60', id: '201', description: 'FG Made (60+ yards)' },
  [FootballStat.FGA60]: { abbrev: 'FGA60', id: '202', description: 'FG Attempted (60+ yards)' },
  [FootballStat.FGM60]: { abbrev: 'FGM60', id: '203', description: 'FG Missed (60+ yards)' },
  [FootballStat.O2PRET]: { abbrev: 'O2PRET', id: '204', description: 'Offensive 2pt Return' },
  [FootballStat.D2PRET]: { abbrev: 'D2PRET', id: '205', description: 'Defensive 2pt Return' },
  [FootballStat.TWOPTRETURN]: { abbrev: '2PRET', id: '206', description: '2pt Return' },
  [FootballStat.O1PSF]: { abbrev: 'O1PSF', id: '207', description: 'Offensive 1pt Safety' },
  [FootballStat.D1PSF]: { abbrev: 'D1PSF', id: '208', description: 'Defensive 1pt Safety' },
  [FootballStat.ONEPTSFTY]: { abbrev: '1PSF', id: '209', description: '1pt Safety' },
  [FootballStat.GP]: { abbrev: 'GP', id: '210', description: 'Games Played' },
  [FootballStat.MISCTD]: { abbrev: 'MISCTD', id: '10000', description: 'TD Misc' },
  [FootballStat.RRETD]: { abbrev: 'RRETD', id: '10001', description: 'Total Rushing and Receiving TD' },
  [FootballStat.TargetsPerGame]: { abbrev: 'Tar/G', id: '20000', description: 'Targets per game' },
} as const;

export const NFL_STATS_LIST = Object.values(NFL_STATS_MAP);
