import { Selector } from '@ngxs/store';
import { TableColumn } from '../models/table.model';

export class DailyFantasyTableSelectors {
  @Selector()
  static playerTableList(playerColumns: unknown[]): unknown[] {
    return [];
  }

  @Selector()
  static playerDisplayColumns(tableColumns: TableColumn[]): string[] {
    return [];
  }
}
