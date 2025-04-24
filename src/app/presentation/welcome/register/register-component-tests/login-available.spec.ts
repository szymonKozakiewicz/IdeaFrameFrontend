import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { Location } from '@angular/common';
import { LogoComponent } from 'src/app/presentation/logo/logo.component';
import { FormFrameRegisterLoginComponent } from '../../form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from '../register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getStatusOfInputsRequiredErrorsAndInputsBorders } from '../../login/loginTestHelpers';
import { getLoginRequiredError, getPasswordRequiredError, getTagByTestId } from '../../registerLoginTestHelpers';
import { getStatusOfPasswordInputBorderAndErrors, getStatusOfRepeatPasswordInputBorderAndErrors } from '../registerTestHelpers';
import { provideRouter, Router } from '@angular/router';
import { CustomHttpClient } from 'src/app/infrastructure/http/custom-http-client';
import { of } from 'rxjs';
import { RegisterService } from 'src/app/core/services/register.service';
import { getRegisterServiceMock, getRouterMock } from 'src/app/testHelpers/service-mock-generator';
import { UserRegisterLoginDTO } from 'src/app/core/dto/user-register-login.dto';
import { routes } from 'src/app/app.routes';
import { SpyLocation } from '@angular/common/testing';



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

  let registerServiceMock: any;
  let router: Router;
  let location: Location;

  beforeEach(async () => {

    registerServiceMock = getRegisterServiceMock()

    await TestBed.configureTestingModule({
      declarations: [LogoComponent, RegisterComponent, FormFrameRegisterLoginComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: RegisterService, useValue: registerServiceMock },
        provideRouter(routes),
        { provide: Location, useClass: SpyLocation }
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


  describe("login available test", () => {
    beforeEach(async () => {
      router = TestBed.inject(Router);
      location=TestBed.inject(Location);

    });

    it("testing if after register button is clicked and login is available then link to operation result page is activated", fakeAsync(async () => {
      {
        
        //arrange
        registerServiceMock.isLoginAvailable.and.returnValue(of(true));
        passwordInput.value = "testPassword2";
        passwordInput.dispatchEvent(new Event("input"));
        repeatPasswordInput.value = "testPassword2";
        repeatPasswordInput.dispatchEvent(new Event("input"));
        loginInput.value = "tesLogin"
        loginInput.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        


        //act
        registerForm.dispatchEvent(new Event("submit"));
        fixture.detectChanges();
        tick(1000);


        //assert

        expect(location.path()).toBe('/registerOperationResult');
        

      }


    }));


    it("testing if after register button is clicked and login isn't available then link to operation result page is not activated",fakeAsync(async () => {
      {

        //arrange
        registerServiceMock.isLoginAvailable.and.returnValue(of(false));
        passwordInput.value = "testPassword2";
        passwordInput.dispatchEvent(new Event("input"));
        repeatPasswordInput.value = "testPassword2";
        repeatPasswordInput.dispatchEvent(new Event("input"));
        loginInput.value = "tesLogin"
        loginInput.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        


        //act
        
        registerForm.dispatchEvent(new Event("submit"));
        fixture.detectChanges();
        tick(1000);


        //assert
        
        expect(location.path()).not.toBe('/registerOperationResult');
        

      }


    }));

  })

});