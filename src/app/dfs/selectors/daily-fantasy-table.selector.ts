import { Selector } from '@ngxs/store';
import { TableColumn } from '../models/table.model';

export class DailyFantasyTableSelectors {
  @Selector()
  static playerTableList(playerColumns: any[]): any[] {
    return [];
  }

  @Selector()
  static playerDisplayColumns(tableColumns: TableColumn[]): string[] {
    return [];
  }
}
