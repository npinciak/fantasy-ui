import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NFLDfsFacade {
  @Select() public loading$: Observable<boolean>;
  @Select() public masterPlayersLength$: Observable<number>;
}
