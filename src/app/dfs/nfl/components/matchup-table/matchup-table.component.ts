import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { blendColors } from '@app/@shared/helpers/color-blender';
import { sortAccessor } from '@app/@shared/helpers/sort';
import { ThresholdClass } from '@app/dfs/dfs.const';
import { TableColumn } from '@app/dfs/mlb/selectors/table.selector';

@Component({
  selector: 'app-matchup-table',
  templateUrl: './matchup-table.component.html',
  styleUrls: ['./matchup-table.component.scss'],
})
export class MatchupTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() tableData: any[];
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
    // this.dataSource.sortingDataAccessor = (player, stat) => sortAccessor(player, stat);
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

  colorScaleTable = (min: number = 1, max: number = 33, val: number, thresholdType) => {
    if (thresholdType) {
      // The colors to use for the gradient starting at the lowest and highest values
      //let low_hex  = '#00FF66' ;
      //let high_hex = '#443456' ;

      // ===== Light/bright colors ===== //
      //let low_hex  = '#FF4545' ; // Red
      //let low_hex  = '#FFFF45' ; // Yellow
      //let low_hex  = '#FFE445' ; // Orange
      //let high_hex = '#45FF45' ; // Green

      // ===== Dark Colors ===== //
      const highHex = '#d43d51'; // Orange
      const lowHex = '#00876c'; // Green

      // Get min value in range
      const minVal = min;

      // Get maximum value in range
      const maxVal = max;

      // The distance between min_val and max_val
      const range = maxVal - minVal;

      const percentInRange = val / range;

      //color = blendColors(low_hex, high_hex, 0.5);
      let color = blendColors(lowHex, highHex, percentInRange);

      // Concatenate an alpha/opacity value onto the hex color. Ex: #00FF00 --> #00FF0084
      color += '64';

      return color;
    }
  };
}
