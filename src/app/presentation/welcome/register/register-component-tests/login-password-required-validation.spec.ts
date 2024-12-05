import { ComponentFixture, TestBed } from '@angular/core/testing';


import { LogoComponent } from 'src/app/presentation/logo/logo.component';
import { FormFrameRegisterLoginComponent } from '../../form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from '../register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getStatusOfInputsRequiredErrorsAndInputsBorders } from '../../login/loginTestHelpers';
import { getLoginRequiredError, getPasswordRequiredError, getTagByTestId } from '../../registerLoginTestHelpers';
import { getStatusOfPasswordInputBorderAndErrors, getStatusOfRepeatPasswordInputBorderAndErrors } from '../registerTestHelpers';
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
  let loginInput:HTMLInputElement
  let passwordInput:HTMLInputElement
  let repeatPasswordInput:HTMLInputElement
  let registerSubmitButton:HTMLElement
  let registerForm:HTMLElement;
  let router:Router;
  let registerServiceMock:any;

  beforeEach(async () => {

    registerServiceMock=getRegisterServiceMock()
    await TestBed.configureTestingModule({
      declarations: [LogoComponent,RegisterComponent, FormFrameRegisterLoginComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
      providers:[
        {provide: RegisterService, useValue:registerServiceMock}
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

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('login and password inputs tests, no data in inputs',()=>{
    beforeEach(async () => {

   
    });
    it('no input touched, error messages shouldnt be visible, border of inputs shouldnt be red', () => {
      //act
      loginError = getLoginRequiredError(fixture);
      passwordError = getPasswordRequiredError(fixture);
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("NNNN").toEqual(result);

    });
    it("login input touched, error messages should be visible only in case of login, border of inputs should be red only in case of login", () => {
      //arrange

      
      //act
      loginInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = getLoginRequiredError(fixture);
      passwordError = getPasswordRequiredError(fixture);
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("PNPN").toEqual(result);

    });
    it("password input touched, error messages should be visible only in cas of password, border of inputs should be red only in case of password", () => {
      //arrange

      
      //act
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = getLoginRequiredError(fixture);
      passwordError = getPasswordRequiredError(fixture);
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("NPNP").toEqual(result);

    });
    it("password and login inputs touched, error messages should be visible only in case of both inputs, border of inputs should be red in both cases", () => {
      //arrange

      
      //act
      passwordInput.dispatchEvent(new Event("blur"));
      loginInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = getLoginRequiredError(fixture);
      passwordError = getPasswordRequiredError(fixture);
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("PPPP").toEqual(result);

    });
  })
  describe("login and password inputs tests, data in password, no data in login'",()=>
  {
    beforeEach(async () => {
      passwordInput.value="testPassword2"

      passwordInput.dispatchEvent(new Event('input'));
    });
    it("password and login inputs touched, error messages should be visible only in case of login input, only border of login input should be red", () => {
      //arrange

      
      //act

      passwordInput.dispatchEvent(new Event("blur"));
      loginInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = getLoginRequiredError(fixture);
      passwordError = getPasswordRequiredError(fixture);
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("PNPN").toEqual(result);

    });
  })
  describe("login and password inputs tests, data in login, no data in password",()=>
  {
    beforeEach(async () => {
      loginInput.value="testLogin"

      loginInput.dispatchEvent(new Event('input'));
    });
    it("password and login inputs touched, error messages should be visible only in case of login input, only border of login input should be red", () => {
      //arrange

      
      //act

      passwordInput.dispatchEvent(new Event("blur"));
      loginInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = getLoginRequiredError(fixture);
      passwordError = getPasswordRequiredError(fixture);
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("NPNP").toEqual(result);

    });
  })

});





