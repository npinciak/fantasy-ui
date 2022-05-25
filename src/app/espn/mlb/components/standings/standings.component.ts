import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnDataType } from '@app/espn/models/table.model';
import * as _ from 'lodash';
import { BaseballTeam } from '../../models/baseball-team.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements AfterViewInit {
  @Input() data: BaseballTeam[];
  @Input() rows: any[];
  @Input() headers: string[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  readonly TableColumnDataType = TableColumnDataType;

  dataSource = new MatTableDataSource<BaseballTeam>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = _.get;
    this.cdr.detectChanges();
  }
}
