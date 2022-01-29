import { Component, Input, OnInit } from '@angular/core';
import { blendColors } from '@app/@shared/helpers/color-blender';

@Component({
  selector: 'app-player-table-ranking-column',
  templateUrl: './player-table-ranking-column.component.html',
  styleUrls: ['./player-table-ranking-column.component.scss'],
})
export class PlayerTableRankingColumnComponent implements OnInit {
  @Input() cellData: number;

  constructor() {}

  ngOnInit(): void {}

  colorScaleTable = (min: number = 1, max: number = 33, val: number, thresholdType: string = 'highToLow') => {
    // 'lowToHigh' | 'highToLow'
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
      const highHex = thresholdType === 'highToLow' ? '#d43d51' : '#00876c'; // Orange
      const lowHex = thresholdType === 'highToLow' ? '#00876c' : '#d43d51'; // Green

      // Get min value in range
      const minVal = min;

      // Get maximum value in range
      const maxVal = max;

      // The distance between min_val and max_val
      const range = maxVal - minVal;

      const percentInRange = val / range;

      //color = blendColors(low_hex, high_hex, 0.5);
      const color = blendColors(lowHex, highHex, percentInRange);

      // Concatenate an alpha/opacity value onto the hex color. Ex: #00FF00 --> #00FF0084
      // color += '0';

      return color;
    }
  };
}
