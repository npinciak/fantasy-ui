import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlateTypeMap } from '@app/dfs/selectors/daily-fantasy-slate.selectors';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';

@Component({
  selector: 'app-slate-list',
  templateUrl: './slate-list.component.html',
  styles: ['.mat-list-base .mat-list-item{font-size:14px}'],
})
export class DfsSlateListComponent {
  @Input() slateList: SlateTypeMap;
  @Output() selectSlate = new EventEmitter<SiteSlateEntity>();

  constructor() {}
}
