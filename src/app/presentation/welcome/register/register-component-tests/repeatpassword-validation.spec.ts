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

  let loginInput:HTMLInputElement
  let passwordInput:HTMLInputElement
  let repeatPasswordInput:HTMLInputElement
  let registerSubmitButton:HTMLElement
  let registerForm:HTMLElement;

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



 

    describe("repeat password validation tests",()=>
    {
        beforeEach(async () => {

        });
        it("no value in repeat password, repeat password  not touched, expect that no error message will appear and borders of repeat password input will not be red", () => {
        //arrange

        
        //act
      

        fixture.detectChanges();
        let matchError=getTagByTestId(fixture,"repeatPasswordMatchError");
        let requiredError=getTagByTestId(fixture,"repeatPasswordRequiredError");

        //assert
        const result: string = getStatusOfRepeatPasswordInputBorderAndErrors(matchError,requiredError,repeatPasswordInput);
        expect("NNN").toEqual(result);

        });

        it("no value in repeat password, repeat password  touched, expect that only required error message will appear and borders of repeat password input will be red", () => {
            //arrange
    
            
            //act
          
            repeatPasswordInput.dispatchEvent(new Event("blur"));
            fixture.detectChanges();
            let matchError=getTagByTestId(fixture,"repeatPasswordMatchError");
            let requiredError=getTagByTestId(fixture,"repeatPasswordRequiredError");
            
            //assert
            const result: string = getStatusOfRepeatPasswordInputBorderAndErrors(matchError,requiredError,repeatPasswordInput);
            expect("NPP").toEqual(result);
    
        });
        it("there is value in repeat password which is same like in password, repeat password  touched, expect that no error message will appear and borders of repeat password input will not be red", () => {
            //arrange
    
            
            //act
            passwordInput.value="testPassword"
            repeatPasswordInput.value="testPassword"
            repeatPasswordInput.dispatchEvent(new Event("input"));
            passwordInput.dispatchEvent(new Event("input"));
            repeatPasswordInput.dispatchEvent(new Event("blur"));
            fixture.detectChanges();
            let matchError=getTagByTestId(fixture,"repeatPasswordMatchError");
            let requiredError=getTagByTestId(fixture,"repeatPasswordRequiredError");
            
            //assert
            const result: string = getStatusOfRepeatPasswordInputBorderAndErrors(matchError,requiredError,repeatPasswordInput);
            expect("NNN").toEqual(result);
    
        });
        it("there is value in repeat password which is diffrent than the one in password, repeatPassword  touched,  expect that only match error message will appear and borders of repeat password input will be red", () => {
          //arrange
  
          
          //act
          passwordInput.value="testPassword"
          repeatPasswordInput.value="testPassword2"
          repeatPasswordInput.dispatchEvent(new Event("input"));
          passwordInput.dispatchEvent(new Event("input"));
          repeatPasswordInput.dispatchEvent(new Event("blur"));
          fixture.detectChanges();
          let matchError=getTagByTestId(fixture,"repeatPasswordMatchError");
          let requiredError=getTagByTestId(fixture,"repeatPasswordRequiredError");
          
          //assert
          const result: string = getStatusOfRepeatPasswordInputBorderAndErrors(matchError,requiredError,repeatPasswordInput);
          expect("PNP").toEqual(result);
  
      });
    })


});