import { Injectable } from '@angular/core';
import { SupabaseClientService } from '@app/@shared/supa/supa-client.service';

@Injectable({ providedIn: 'root' })
export class TeamsClientService extends SupabaseClientService<'team'>({ table: 'team' }){}
