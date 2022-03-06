import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  sportSelection: string;
  constructor() {}

  ngOnInit(): void {}

  onAddLeague() {
    const sport = this.sportSelection;
    const leagueId = this.leagueIdElement.nativeElement.value;

    const map = { [leagueId]: { leagueId, sport } };

    this.addLeague.emit(map);
    this.resetLeagueIdInput();
    this.resetSportSelection();
  }

  onRemoveLeague(leagueId) {
    this.removeLeague.emit(leagueId);
  }

  fantasySportChange(event: string) {
    this.sportSelection = event;

    // this.sportChange.emit(event);
  }

  resetLeagueIdInput(): void {
    this.leagueIdElement.nativeElement.value = null;
  }

  resetSportSelection(): void {
    this.sportSelection = null;
  }
}
