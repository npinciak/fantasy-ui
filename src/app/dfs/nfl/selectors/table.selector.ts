/* eslint-disable arrow-body-style */
import { sortAccessor } from '@app/@shared/helpers/sort';
import { cellDataAccessor } from '@app/@shared/helpers/utils';
import { Selector } from '@ngxs/store';
import { PlayerTableRow } from '../models/nfl-player-table-row.model';
import { NFLTableColumn } from '../models/nfl-table.model';

export interface TableColumn {
  columnDef: string;
  tooltip?: string | null;
  data: string;
  headerLabel: string;
  thresholdType?: string; // 'lowToHigh' | 'highToLow' ;
  thresholdMin?: number;
  thresholdMax?: number;
}

export class NFLTableSelectors {
  @Selector()
  static playerColList(): any[] {
    return [
      { data: NFLTableColumn.Name, thresholdType: '', headerLabel: '' },
      { data: NFLTableColumn.Salary, thresholdType: '', headerLabel: '' },
      {
        data: 'playerProjection.expertRating',
        thresholdMin: 1,
        thresholdMax: 30,
        thresholdType: 'highToLow',
        headerLabel: 'expertRating',
      },

      { data: 'playerProjection.fpts', thresholdMin: 0, thresholdMax: 30, thresholdType: 'lowToHigh', headerLabel: 'FPts' },
      { data: 'playerAdvanced.fptsPerGame', thresholdMin: 0, thresholdMax: 40, thresholdType: 'lowToHigh', headerLabel: 'FPts/G' },
      { data: 'playerProjection.fptsVal', thresholdMin: 0, thresholdMax: 30, thresholdType: 'lowToHigh', headerLabel: 'fptsVal' },

      { data: 'playerProjection.ceil', thresholdMin: 0, thresholdMax: 45, thresholdType: 'lowToHigh', headerLabel: 'ceiling' },
      { data: 'playerProjection.floor', thresholdMin: 0, thresholdMax: 20, thresholdType: 'lowToHigh', headerLabel: 'floor' },
      {
        data: 'playerProjection.slateOwnership',
        thresholdMin: 0,
        thresholdMax: 30,
        thresholdType: 'highToLow',
        headerLabel: 'slateOwnership',
      },
      { data: 'playerAdvanced.productionPrem', headerLabel: 'productionPrem' },
      { data: 'playerAdvanced.productionPremRank', headerLabel: 'productionPremRnk' },
      { data: 'playerAdvanced.epa', thresholdMin: 0, thresholdMax: 60, thresholdType: 'lowToHigh', headerLabel: 'EPA' },
      { data: 'playerAdvanced.epaPass', thresholdMin: 0, thresholdMax: 60, thresholdType: 'lowToHigh', headerLabel: 'Pass EPA' },
      { data: 'playerAdvanced.epaRun', thresholdMin: 0, thresholdMax: 60, thresholdType: 'lowToHigh', headerLabel: 'Run EPA' },
      { data: 'playerAdvanced.targetShare', thresholdMin: 0, thresholdMax: 50, thresholdType: 'lowToHigh', headerLabel: 'Tar. Share' },
      { data: 'playerAdvanced.rzOppShare', thresholdMin: 0, thresholdMax: 100, thresholdType: 'lowToHigh', headerLabel: 'RZ Opp Share' },
      { data: 'playerAdvanced.rzTargetShare', thresholdMin: 0, thresholdMax: 100, thresholdType: 'lowToHigh', headerLabel: 'RZ Tar. %' },
      { data: 'playerAdvanced.goalLineCarriesGame', headerLabel: 'Goaline Carries/G' },
      { data: NFLTableColumn.DomRating, thresholdMin: 0, thresholdMax: 100, thresholdType: 'lowToHigh', headerLabel: 'dominatorRating' },
      { data: 'playerAdvanced.aDOT', thresholdMin: 0, thresholdMax: 100, thresholdType: 'lowToHigh', headerLabel: 'aDOT' },
      { data: 'playerAdvanced.avgTargetDist', thresholdMin: 0, thresholdMax: 50, thresholdType: 'lowToHigh', headerLabel: 'Avg Tar. Dist' },
      { data: NFLTableColumn.CatchTarRate, thresholdMin: 0, thresholdMax: 100, thresholdType: 'lowToHigh', headerLabel: 'Catch Tar. Rate' },
      { data: 'playerAdvanced.gameScript', thresholdMin: -11, thresholdMax: 11, thresholdType: 'lowToHigh', headerLabel: 'gameScript' },
      { data: 'opponent.passDefRk', thresholdType: 'lowToHigh', headerLabel: 'Opp Pass Def Rk' },
      { data: 'opponent.fptsAllowedRk.allowedToAdjQb', thresholdType: 'highToLow', headerLabel: 'Opp FPts Allowed To Qb' },
      { data: 'opponent.fptsAllowedRk.allowedToAdjRb', thresholdType: 'highToLow', headerLabel: 'Opp FPts Allowed To Rb' },
      { data: 'opponent.fptsAllowedRk.allowedToAdjWr', thresholdType: 'highToLow', headerLabel: 'Opp FPts Allowed To Wr' },
      { data: 'opponent.fptsAllowedRk.allowedToAdjTe', thresholdType: 'highToLow', headerLabel: 'Opp FPts Allowed To Te' },
    ];
  }

  @Selector()
  static playerColListWR(): any[] {
    return [
      { data: 'name', thresholdType: '', headerLabel: '' },
      { data: 'salary', thresholdType: '', headerLabel: '' },
      { data: 'playerProjection.fpts', thresholdMin: 0, thresholdMax: 30, thresholdType: 'lowToHigh', headerLabel: 'fpts' },
      { data: 'playerProjection.ceil', thresholdMin: 0, thresholdMax: 45, thresholdType: 'lowToHigh', headerLabel: 'ceiling' },
      { data: 'playerProjection.floor', thresholdMin: 0, thresholdMax: 20, thresholdType: 'lowToHigh', headerLabel: 'floor' },
      { data: 'playerAdvanced.fptsPerGame', thresholdMin: 0, thresholdMax: 40, thresholdType: 'lowToHigh', headerLabel: 'FPts/g' },
      { data: 'playerAdvanced.targetShare', thresholdMin: 0, thresholdMax: 50, thresholdType: 'lowToHigh', headerLabel: 'Target %' },
      { data: 'playerAdvanced.rzTargetShare', thresholdMin: 0, thresholdMax: 50, thresholdType: 'lowToHigh', headerLabel: 'RZ Target %' },
      {
        data: 'playerAdvanced.dominatorRating',
        thresholdMin: 0,
        thresholdMax: 100,
        thresholdType: 'lowToHigh',
        headerLabel: 'Dominator Rating',
      },
      { data: 'playerAdvanced.aDOT', thresholdMin: 0, thresholdMax: 100, thresholdType: 'lowToHigh', headerLabel: 'aDOT' },
      {
        data: 'playerAdvanced.avgTargetDist',
        thresholdMin: 0,
        thresholdMax: 50,
        thresholdType: 'lowToHigh',
        headerLabel: 'Avg Tar Dist',
      },
      {
        data: 'playerAdvanced.catchableTargetRate',
        thresholdMin: 0,
        thresholdMax: 100,
        thresholdType: 'lowToHigh',
        headerLabel: 'Catchable Tar. %',
      },
      { data: 'playerAdvanced.gameScript', thresholdMin: -11, thresholdMax: 11, thresholdType: 'lowToHigh', headerLabel: 'gameScript' },
      { data: 'opponent.passDefRk', thresholdType: 'lowToHigh', headerLabel: 'OppPassDefRk' },
      { data: 'opponent.fptsAllowedRk.allowedToAdjQb', thresholdType: 'highToLow', headerLabel: 'allowedToAdjQb' },
      { data: 'opponent.fptsAllowedRk.allowedToAdjWr', thresholdType: 'highToLow', headerLabel: 'allowedToAdjWr' },
    ];
  }

  @Selector([NFLTableSelectors.playerColList])
  static playerTableList(playerCols: any[]): any[] {
    return playerCols.map(col => {
      return {
        columnDef: col.data,
        cellData: (data: PlayerTableRow) => cellDataAccessor(data, col.data),
        headerLabel: col.headerLabel,
        thresholdType: col.thresholdType,
        thresholdMin: col.thresholdMin,
        thresholdMax: col.thresholdMax,
      };
    });
  }

  @Selector([NFLTableSelectors.playerTableList])
  static playerDisplayColumns(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }

  @Selector()
  static matchupTableList(): any[] {
    return [
      { columnDef: 'teamName', cellData: 'teamName', headerLabel: '', hasTooltip: false },
      { columnDef: 'opponent', cellData: 'opponent', headerLabel: 'Opp', hasTooltip: false },
      { columnDef: 'vegasOU', cellData: 'vegasOU', headerLabel: 'O/U', hasTooltip: false },
      { columnDef: 'vegasLine', cellData: 'vegasLine', headerLabel: 'line', hasTooltip: false },
      { columnDef: 'vegasTotal', cellData: 'vegasTotal', headerLabel: 'total', hasTooltip: false },
      { columnDef: 'vegasMovement', cellData: 'vegasMovement', headerLabel: 'movement', hasTooltip: false },
      {
        columnDef: 'oppAdjQb',
        cellData: 'oppAdjQb',
        headerLabel: 'oppAdjQb',
        tooltip: (opp, rank) => tooltipHelper(opp, rank),
        thresholdType: 'ranking',
        hasTooltip: true,
      },
      {
        columnDef: 'oppAdjRb',
        cellData: 'oppAdjRb',
        headerLabel: 'oppAdjRb',
        tooltip: (opp, rank) => tooltipHelper(opp, rank),
        thresholdType: 'ranking',
        hasTooltip: true,
      },
      {
        columnDef: '​​oppAdjTe',
        cellData: '​​oppAdjTe',
        headerLabel: '​​oppAdjTe',
        tooltip: (opp, rank) => tooltipHelper(opp, rank),
        thresholdType: 'ranking',
        hasTooltip: true,
      },
      {
        columnDef: 'oppAdjWr',
        cellData: 'oppAdjWr',
        headerLabel: 'oppAdjWr',
        tooltip: (opp, rank) => tooltipHelper(opp, rank),
        thresholdType: 'ranking',
        hasTooltip: true,
      },
    ];
  }

  @Selector([NFLTableSelectors.matchupTableList])
  static matchupDisplayColumns(tableColumns: TableColumn[]): string[] {
    return tableColumns.map(col => col.columnDef);
  }
}

const tooltipHelper = (opp: string, rank: number): string => {
  if (rank === undefined) {
    return;
  }

  if (rank === 1) {
    return `${opp} gives up the most points to this position`;
  } else if (rank === 2) {
    return `${opp} gives up the 2nd most points to this position`;
  } else if (rank === 3) {
    return `${opp} gives up the 3rd most points to this position`;
  } else if (rank >= 4 && rank <= 15) {
    return `${opp} gives up the ${rank}th most points to this position`;
  } else if (rank <= 29 && rank >= 20) {
    return `${opp} gives up the ${32 - rank}th least points to this position`;
  } else if (rank === 30) {
    return `${opp} gives up the 3rd least points to this position`;
  } else if (rank === 31) {
    return `${opp} gives up the 2nd least points to this position`;
  } else if (rank === 32) {
    return `${opp} gives up the least points to this position`;
  }
};
