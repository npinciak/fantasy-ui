import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DfsSite } from '@app/dfs/dfs.const';
import { DfsFacade } from '@app/dfs/mlb/facade/dfs.facade';
import { DfsSlate } from '@app/dfs/mlb/models/slateMaster.interface';
import { SlateType } from '@app/dfs/mlb/selectors/slate.selector';

@Component({
  selector: 'app-slate-list',
  templateUrl: './slate-list.component.html',
})
export class SlateListComponent implements OnInit {
  @Input() slateList: { [slateType in SlateType]: DfsSlate[] };
  @Output() selectSlate = new EventEmitter<DfsSlate>();

  constructor(readonly dfsFacade: DfsFacade) {}

  ngOnInit(): void {}
}
