import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SiteSlateEntity } from '@app/dfs/models/daily-fantasy-client.model';
import { SlateTypeMap } from '@app/dfs/selectors/daily-fantasy-slate.selectors';

@Component({
  selector: 'app-slate-list',
  templateUrl: './slate-list.component.html',
  styles: ['.mat-list-base .mat-list-item{font-size:14px}'],
})
export class SlateListComponent {
  @Input() slateList: SlateTypeMap;
  @Output() selectSlate = new EventEmitter<SiteSlateEntity>();

  constructor() {}
}
