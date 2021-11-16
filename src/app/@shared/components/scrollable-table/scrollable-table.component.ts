import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrollable-table',
  templateUrl: './scrollable-table.component.html',
  styleUrls: ['./scrollable-table.component.scss'],
})
export class ScrollableTableComponent implements OnInit {
  @Input() maxHeight = null;
  @Input() horizontalScroll = true;
  @Input() fixedHeight = false;
  constructor() {}

  ngOnInit(): void {}

  public get verticalScroll(): boolean {
    return this.maxHeight != null;
  }

  public get maxHeightSmall(): boolean {
    return this.maxHeight === ScrollableTableMaxHeight.Small;
  }

  public get maxHeightMedium(): boolean {
    return this.maxHeight === ScrollableTableMaxHeight.Medium;
  }

  public get maxHeightLarge(): boolean {
    return this.maxHeight === ScrollableTableMaxHeight.Large;
  }
}

export enum ScrollableTableMaxHeight {
  Small,
  Medium,
  Large,
}
