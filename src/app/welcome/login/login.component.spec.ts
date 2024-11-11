import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LogoComponent } from 'src/app/logo/logo.component';
import { FormFrameRegisterLoginComponent } from '../form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from '../register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getStatusOfInputsRequiredErrorsAndInputsBorders } from './testHelpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginError: any;
  let passwordError: any;
  let loginInput:HTMLElement
  let passwordInput:HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent,LoginComponent, FormFrameRegisterLoginComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    loginInput = fixture.debugElement.nativeElement.querySelector('[data-testid="loginInput"]');
    passwordInput = fixture.debugElement.nativeElement.querySelector('[data-testid="passwordInput"]');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('no data in inputs',()=>{
    beforeEach(async () => {

   
    });
    it('no input touched, error messages shouldnt be visible, border of inputs shouldnt be red', () => {
      //act
      loginError = fixture.debugElement.nativeElement.querySelector('[data-testid="loginRequiredError"]');
      passwordError = fixture.debugElement.nativeElement.querySelector('[data-testid="passwordRequiredError"]');
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("NNNN").toEqual(result);

    });
    it("login input touched, error messages should be visible only in case of login, border of inputs should be red only in case of login", () => {
      //arrange

      
      //act
      loginInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = fixture.debugElement.nativeElement.querySelector('[data-testid="loginRequiredError"]');
      passwordError = fixture.debugElement.nativeElement.querySelector('[data-testid="passwordRequiredError"]');
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("PNPN").toEqual(result);

    });
    it("password input touched, error messages should be visible only in cas of password, border of inputs should be red only in case of password", () => {
      //arrange

      
      //act
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      loginError = fixture.debugElement.nativeElement.querySelector('[data-testid="loginRequiredError"]');
      passwordError = fixture.debugElement.nativeElement.querySelector('[data-testid="passwordRequiredError"]');
      
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
      loginError = fixture.debugElement.nativeElement.querySelector('[data-testid="loginRequiredError"]');
      passwordError = fixture.debugElement.nativeElement.querySelector('[data-testid="passwordRequiredError"]');
      
      //assert
      const result: string = getStatusOfInputsRequiredErrorsAndInputsBorders(loginError, passwordError, passwordInput, loginInput);
      expect("PPPP").toEqual(result);

    });
  })

});

