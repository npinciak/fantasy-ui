import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnDataType } from '@app/@shared/models/table-columns.model';
import { cellDataAccessor } from '@sports-ui/ui-sdk/helpers';

@Component({
  selector: 'app-espn-standings-table',
  templateUrl: './espn-standings-table.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EspnStandingsTableComponent<T> {
  @Input() data: T[];
  @Input() rows: any[];
  @Input() headers: string[];
  @Output() navigateToTeam = new EventEmitter<string>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  readonly TableColumnDataType = TableColumnDataType;

  dataSource = new MatTableDataSource<T>();
  teamClicked = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (team, stat) => cellDataAccessor(team, stat);

    this.cdr.detectChanges();
  }

  onNavigateToTeam(id: string) {
    this.teamClicked = true;
    this.navigateToTeam.emit(id);
  }
}
