import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { sortAccessor } from '@app/@shared/helpers/sort';
import { TableColumn } from '@app/dfs/models/table.model';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  @Input() dfsPlayers: any[] = [];
  @Input() displayColumns: string[] = [];
  @Input() dataColumns: TableColumn[] = [];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.dataSource.data = this.dfsPlayers;
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.dfsPlayers;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // this.dataSource.filter = this.filter;
    this.dataSource.sortingDataAccessor = (obj, path) => sortAccessor(obj, path);
    // this.dataSource.filterPredicate = this.dataSourceFilter();
    this.cdr.detectChanges();
  }
}
