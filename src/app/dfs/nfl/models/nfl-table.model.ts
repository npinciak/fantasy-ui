export type TableFilter = { filterType: FilterType; value: string };

export enum FilterType {
  team,
  pos,
  name,
  statGroup,
  salary,
}

export enum NFLTableColumn {
  Name = 'name',
  Salary = 'salary',
  Fpts = 'playerProjection.fpts',
  Ceiling = 'playerProjection.ceil',
  Floor = 'playerProjection.floor',
  FptsPerGame = 'playerAdvanced.fptsPerGame',
  Epa = 'playerAdvanced.epa',
  EpaPass = 'playerAdvanced.epaPass',
  EpaRun = 'playerAdvanced.epaRun',
  TargetShare = 'playerAdvanced.targetShare',
  RZTargetShare = 'playerAdvanced.rzTargetShare',
  GLCarriesPerGame = 'playerAdvanced.goalLineCarriesGame',
  DomRating = 'playerAdvanced.dominatorRating',
  ADot = 'playerAdvanced.aDOT',
  AvgTarDist = 'playerAdvanced.avgTargetDist',
  CatchTarRate = 'playerAdvanced.catchableTargetRate',
  GameScript = 'playerAdvanced.gameScript',
  OppPassDefRk = 'opponent.passDefRk',
  OppFPtsToQB = 'opponent.fptsAllowedRk.allowedToAdjQb',
  OppFPtsToRB = 'opponent.fptsAllowedRk.allowedToAdjRb',
  OppFPtsToWR = 'opponent.fptsAllowedRk.allowedToAdjWr',
  OppFPtsToTE = 'opponent.fptsAllowedRk.allowedToAdjTe',
}
