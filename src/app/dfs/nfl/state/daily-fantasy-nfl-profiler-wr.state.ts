import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddNflProfilerWR, name, SetPlayerNflProfilerWR } from '../actions/daily-fantasy-nfl-profiler-wr.actions';

@State({ name })
@Injectable()
export class DailyFantasyNflProfilerWRState extends GenericState({
  idProperty: 'profilerId',
  addOrUpdate: SetPlayerNflProfilerWR,
  clearAndAdd: ClearAndAddNflProfilerWR,
}) {}
