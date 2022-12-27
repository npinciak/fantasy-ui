import { Injectable } from '@angular/core';
import { SportsUiClientLeague } from '../models/sports-ui-league.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class TeamsClientService extends BaseCrudService<SportsUiClientLeague>({ table: 'Teams' }) {}
