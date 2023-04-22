import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
})
export class ShellComponent implements OnInit {
  @Input() pageTitle = 'SportsUi';

  constructor() {}

  ngOnInit(): void {}
}
