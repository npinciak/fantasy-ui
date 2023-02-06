import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from '@app/@shared/models/table-columns.model';

/**
 * @deprecated
 */
@Component({
  selector: 'app-matchup-table',
  templateUrl: './matchup-table.component.html',
  styleUrls: ['./matchup-table.component.scss'],
})
export class MatchupTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() tableData: unknown[];
  @Input() displayColumns: string[];
  @Input() dataColumns: TableColumn[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.data = this.tableData;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  ngOnChanges(): void {
    this.dataSource.data = this.tableData;
  }

  positiveChange(val: number): boolean {
    return val > 0;
  }

  movementTooltip(movement: number, total: number): string {
    return `From ${total - movement}`;
  }
}
