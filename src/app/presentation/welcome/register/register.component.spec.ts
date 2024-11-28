import { ComponentFixture, TestBed } from '@angular/core/testing';


import { LogoComponent } from 'src/app/presentation/logo/logo.component';
import { FormFrameRegisterLoginComponent } from '../form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from '../register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getStatusOfInputsRequiredErrorsAndInputsBorders } from '../login/loginTestHelpers';
import { getLoginRequiredError, getPasswordRequiredError, getTagByTestId } from '../registerLoginTestHelpers';
import { getStatusOfPasswordInputBorderAndErrors, getStatusOfRepeatPasswordInputBorderAndErrors } from './registerTestHelpers';
import { Router } from '@angular/router';



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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent,RegisterComponent, FormFrameRegisterLoginComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
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
      passwordInput.value="testPassword"

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

    describe("password validation tests",()=>
    {
        beforeEach(async () => {

        });
      
      it("there is value in password which has lenght lower than 6 characters, password  touched,  expect that only lenght error message will appear and borders of password input will be red", () => {
        //arrange

        
        //act
        passwordInput.value="tes"
        passwordInput.dispatchEvent(new Event("input"));
        passwordInput.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        let minLenghtError=getTagByTestId(fixture,"minPasswordLenghtError");
        let requiredError=getTagByTestId(fixture,"passwordRequiredError");
        
        //assert
        const result: string = getStatusOfPasswordInputBorderAndErrors(minLenghtError,requiredError,passwordInput);
        expect("PNP").toEqual(result);

    });
    it("there is value in password which has lenght bigger than 6 characters, password  touched,  expect that no error messages will appear and borders of password input will not be red", () => {
      //arrange

      
      //act
      passwordInput.value="testPassword"
      passwordInput.dispatchEvent(new Event("input"));
      passwordInput.dispatchEvent(new Event("blur"));
      fixture.detectChanges();
      let minLenghtError=getTagByTestId(fixture,"minPasswordLenghtError");
      let requiredError=getTagByTestId(fixture,"passwordRequiredError");
      
      //assert
      const result: string = getStatusOfPasswordInputBorderAndErrors(minLenghtError,requiredError,passwordInput);
      expect("NNN").toEqual(result);

  });
  })
  describe("register test",()=>
  {
    beforeEach(async () => {
      router = TestBed.inject(Router);
    });

    it("testing if after register button is clicked and form is valid then link to operation result page is activated", () => {
    {  

      //arrange
      passwordInput.value="testPassword";
      passwordInput.dispatchEvent(new Event("input"));
      repeatPasswordInput.value="testPassword";
      repeatPasswordInput.dispatchEvent(new Event("input"));
      loginInput.value="tesLogin"
      loginInput.dispatchEvent(new Event("input"));
      fixture.detectChanges();
      

      //act
      spyOn(router, 'navigate');
      registerForm.dispatchEvent(new Event("submit"));
      fixture.detectChanges();


      //assert
      
      expect(router.navigate).toHaveBeenCalledWith(['/operationResult']); 

      
    }
    

  });

  it("testing if after register button is clicked and form is invalid then link to operation result page isn't activated", () => {
    {  

      //arrange
      passwordInput.value="testPassword";
      passwordInput.dispatchEvent(new Event("input"));
      repeatPasswordInput.value="testPassword2";
      repeatPasswordInput.dispatchEvent(new Event("input"));
      loginInput.value="tesLogin"
      loginInput.dispatchEvent(new Event("input"));
      fixture.detectChanges();
      

      //act
      spyOn(router, 'navigate');
      registerForm.dispatchEvent(new Event("submit"));
      fixture.detectChanges();


      //assert
      
      expect(router.navigate).not.toHaveBeenCalled(); 

      
    }
    

  });
  })

});





