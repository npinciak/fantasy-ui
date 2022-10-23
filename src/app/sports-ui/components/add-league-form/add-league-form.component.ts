import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICON_PATH } from '@app/espn/espn.const';
import { LeagueStorageMap } from '@app/espn/mlb/models/baseball-league-storage.model';
import {
  FantasySports,
  FantasySportToLabelMap,
  FantasySportToSportLeagueMap,
  LeagueSportToImageLocationMap,
  SportLeague,
} from '@app/espn/models/espn-endpoint-builder.model';
import { SportsUiLeagueFormFacade } from '@app/sports-ui/facades/sports-ui-league-form.facade';

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
  @Output() navigateLeague = new EventEmitter<{ sport: SportLeague; leagueId: string }>();

  sportOption$ = this.leagueFormFacade.leagueSport$;
  fantasySportOptionList = [
    { value: FantasySports.Baseball, label: FantasySportToLabelMap[FantasySports.Baseball] },
    { value: FantasySports.Football, label: FantasySportToLabelMap[FantasySports.Football] },
  ];

  readonly FantasySports = FantasySports;
  readonly ICON_PATH = ICON_PATH;
  readonly FantasySportToLabelMap = FantasySportToLabelMap;
  readonly LeagueSportToImageLocationMap = LeagueSportToImageLocationMap;

  constructor(readonly leagueFormFacade: SportsUiLeagueFormFacade) {}

  ngOnInit(): void {}

  onAddLeague() {
    this.leagueFormFacade.submit();
  }

  onRemoveLeague(leagueId): void {
    this.removeLeague.emit(leagueId);
  }

  fantasySportChange(val: FantasySports): void {
    this.leagueFormFacade.setSport(val);
  }

  leagueIdInputChange(val: string): void {
    this.leagueFormFacade.setLeagueId(val);
  }

  onNavigate(fantasySport: FantasySports, leagueId: string): void {
    const sport = FantasySportToSportLeagueMap[fantasySport];
    this.navigateLeague.emit({ sport, leagueId });
  }
}
