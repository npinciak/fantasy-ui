import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SlateTypeMap } from '@app/dfs/selectors/daily-fantasy-slate.selectors';
import { ClientSiteSlateEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

@Component({
  selector: 'app-slate-list',
  templateUrl: './slate-list.component.html',
  styles: ['.mat-list-base .mat-list-item{font-size:14px}'],
})
export class DfsSlateListComponent {
  @Input() slateList: SlateTypeMap;
  @Output() selectSlate = new EventEmitter<ClientSiteSlateEntity>();
}
