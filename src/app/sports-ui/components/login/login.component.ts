import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @Input() isFormValid: boolean = false;
  @Input() email: string | null = null;
  @Input() password: string | null = null;
  @Output() signInClicked = new EventEmitter();
  @Output() passwordInputChanged = new EventEmitter();
  @Output() emailInputChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPasswordInputChange(val: string) {
    this.passwordInputChanged.emit(val);
  }

  onEmailInputChange(val: string) {
    this.emailInputChanged.emit(val);
  }

  onSignIn() {
    this.signInClicked.emit();
  }
}
