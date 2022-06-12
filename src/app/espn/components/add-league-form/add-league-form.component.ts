import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UrlBuilder } from '@app/@shared/url-builder';
import { EspnAddLeagueFormFacade } from '@app/espn/facades/espn-add-league-form.facade';
import { LeagueStorageMap } from '@app/espn/mlb/models/baseball-league-storage.model';

@Component({
  selector: 'app-add-league-form',
  templateUrl: './add-league-form.component.html',
  styleUrls: ['./add-league-form.component.scss'],
})
export class AddLeagueFormComponent implements OnInit {
  @Input() leagues: any[];
  @ViewChild('leagueIdInput') leagueIdElement!: ElementRef;
  @ViewChild('fantasySport') fantasySportElement!: ElementRef;

  @Output() sportChange = new EventEmitter<string>();
  @Output() addLeague = new EventEmitter<LeagueStorageMap>();
  @Output() removeLeague = new EventEmitter<string>();

  sportOption: string = 'Baseball';
  readonly UrlBuilder = UrlBuilder;

  constructor(readonly espnAddLeagueFormFacade: EspnAddLeagueFormFacade) {}

  ngOnInit(): void {}

  onAddLeague() {
    const sport = this.sportOption;
    const leagueId = this.leagueIdElement.nativeElement.value;

    const map = { [leagueId]: { leagueId, sport } };

    this.addLeague.emit(map);

    this.espnAddLeagueFormFacade.reset();
  }

  onRemoveLeague(leagueId): void {
    this.removeLeague.emit(leagueId);
  }

  fantasySportChange(val: string): void {
    this.espnAddLeagueFormFacade.setSport(val);
  }

  leagueIdInputChange(val: string): void {
    this.espnAddLeagueFormFacade.setLeagueId(val);
  }
}
