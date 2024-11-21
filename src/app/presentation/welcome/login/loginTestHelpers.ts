import { ComponentFixture } from "@angular/core/testing";
import { LoginComponent } from "./login.component";


export function getStatusOfInputsRequiredErrorsAndInputsBorders(loginError: any, passwordError: any, passwordInput: HTMLElement, loginInput: HTMLElement) {
  const loginErrorStatus: string = loginError ? 'P' : 'N';
  const passwordErrorStatus: string = passwordError ? 'P' : 'N';
  const passwordInputBorderStatus: string = passwordInput.classList.contains('is-invalid') ? 'P' : 'N';
  const loginInputBorderStatus: string = loginInput.classList.contains('is-invalid') ? 'P' : 'N';
  const result: string = loginErrorStatus + passwordErrorStatus + loginInputBorderStatus + passwordInputBorderStatus;
  return result;
}
