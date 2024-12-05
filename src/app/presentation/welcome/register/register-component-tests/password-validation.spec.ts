import { ComponentFixture, TestBed } from '@angular/core/testing';


import { LogoComponent } from 'src/app/presentation/logo/logo.component';
import { FormFrameRegisterLoginComponent } from '../../form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from '../register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getStatusOfInputsRequiredErrorsAndInputsBorders } from '../../login/loginTestHelpers';
import { getLoginRequiredError, getPasswordRequiredError, getTagByTestId } from '../../registerLoginTestHelpers';
import { getStatusOfOnePasswordErrorAndStatusOfBorder, getStatusOfPasswordInputBorderAndErrors, getStatusOfRepeatPasswordInputBorderAndErrors } from '../registerTestHelpers';
import { Router } from '@angular/router';
import { CustomHttpClient } from 'src/app/infrastructure/http/custom-http-client';
import { of } from 'rxjs';
import { RegisterService } from 'src/app/core/services/register.service';
import { getRegisterServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { UserRegisterLoginDTO } from 'src/app/core/dto/user-register-login.dto';



describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let loginError: any;
  let passwordError: any;
  let loginInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let repeatPasswordInput: HTMLInputElement
  let registerSubmitButton: HTMLElement
  let registerForm: HTMLElement;
  let router: Router;
  let registerServiceMock: any;

  beforeEach(async () => {

    registerServiceMock = getRegisterServiceMock()
    await TestBed.configureTestingModule({
      declarations: [LogoComponent, RegisterComponent, FormFrameRegisterLoginComponent],
      imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: RegisterService, useValue: registerServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    loginInput = fixture.debugElement.nativeElement.querySelector('[data-testid="loginInput"]');

    passwordInput = fixture.debugElement.nativeElement.querySelector('[data-testid="passwordInput"]');

    repeatPasswordInput = fixture.debugElement.nativeElement.querySelector('[data-testid="repeatPasswordInput"]');

    registerSubmitButton = fixture.debugElement.nativeElement.querySelector('[data-testid="registerSubmitButton"]');
    registerForm = fixture.debugElement.nativeElement.querySelector('[data-testid="registerForm"]');
    fixture.detectChanges();
  });







  describe("password validation tests", () => {
    beforeEach(async () => {

    });

    it("there is value in password which has lenght lower than 6 characters, password  touched,  expect that only lenght error message will appear and borders of password input will be red", () => {
      //arrange


      //act
      passwordInput.value = "tes"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      let minLenghtError = getTagByTestId(fixture, "minPasswordLenghtError");
      let requiredError = getTagByTestId(fixture, "passwordRequiredError");

      //assert
      const result: string = getStatusOfPasswordInputBorderAndErrors(minLenghtError, requiredError, passwordInput);
      expect("PNP").toEqual(result);

    });
    it("there is value in password which has lenght bigger than 6 characters, password  touched,  expect that no error messages will appear and borders of password input will not be red", () => {
      //arrange


      //act
      passwordInput.value = "testPassword2"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      let minLenghtError = getTagByTestId(fixture, "minPasswordLenghtError");
      let requiredError = getTagByTestId(fixture, "passwordRequiredError");

      //assert
      const result: string = getStatusOfPasswordInputBorderAndErrors(minLenghtError, requiredError, passwordInput);
      expect("NNN").toEqual(result);

    });

    it("there is value in password which include digit, password  touched,  expect that no error messages will appear and borders of password input will not be red", () => {
      //arrange


      //act
      passwordInput.value = "testPassword2"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();

      let digitErrorLabel=getTagByTestId(fixture, "digitError");
      //assert
      const result: string = getStatusOfOnePasswordErrorAndStatusOfBorder(digitErrorLabel, passwordInput);
      expect("NN").toEqual(result);

    });
    it("there is value in password which doesn't include digit, password  touched,  expect that digit error messages will appear and borders of password input will be red", () => {
      //arrange


      //act
      passwordInput.value = "testPassword"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();

      let digitErrorLabel=getTagByTestId(fixture, "digitError");
      //assert
      const result: string = getStatusOfOnePasswordErrorAndStatusOfBorder(digitErrorLabel, passwordInput);
      expect("PP").toEqual(result);

    });

    it("there is value in password which doesn't include any upercase, password  touched,  expect that upercase error messages will appear and borders of password input will be red", () => {
      //arrange


      //act
      passwordInput.value = "testassword2"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();

      let uperCaseError=getTagByTestId(fixture, "uperCaseError");
      //assert
      const result: string = getStatusOfOnePasswordErrorAndStatusOfBorder(uperCaseError, passwordInput);
      expect("PP").toEqual(result);

    });

    it("there is value in password which include upercase, password  touched,  expect that upercase error messages will not appear and borders of password input will not be red", () => {
      //arrange


      //act
      passwordInput.value = "testPassword2"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();

      let uperCaseError=getTagByTestId(fixture, "uperCaseError");
      //assert
      const result: string = getStatusOfOnePasswordErrorAndStatusOfBorder(uperCaseError, passwordInput);
      expect("NN").toEqual(result);

    });
  })


});