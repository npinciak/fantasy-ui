import { Selector } from '@ngxs/store';
import { TableColumn } from '../models/table.model';

export class DailyFantasyTableSelectors {
  @Selector()
  static temp() {
    return;
  }

  @Selector()
  static tableColumns(): TableColumn[] {
    return [];
  }
}
