import { BaseTableColumn, TableColumnDataType, transformTableColumnsToTableRows } from '@app/@shared/models/table-columns.model';
import { SportsUiClientLeague } from '@app/sports-ui/models/sports-ui-league.model';

const USER_LEAGUE_COLUMNS: BaseTableColumn<SportsUiClientLeague & { actions: any }>[] = [
  { columnDef: 'sport', headerCell: 'sport', headerLabel: 'Sport', dataType: TableColumnDataType.String },
  { columnDef: 'name', headerCell: 'name', headerLabel: 'Team', dataType: TableColumnDataType.String },
  { columnDef: 'actions', headerCell: 'actions', headerLabel: 'Actions', dataType: TableColumnDataType.String },
];

export const USER_LEAGUE_ROWS = transformTableColumnsToTableRows(USER_LEAGUE_COLUMNS);
export const USER_LEAGUE_HEADERS = USER_LEAGUE_ROWS.map(r => r.columnDef);
