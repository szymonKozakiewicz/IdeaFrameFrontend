import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, of, tap } from 'rxjs';
import { UserRegisterLoginDTO } from 'src/app/core/dto/user-register-login.dto';
import { LoginStatus } from 'src/app/core/enum/login.status';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  loginStatus:LoginStatus=LoginStatus.EMPTY;

  loginStatusForFrontend=LoginStatus.EMPTY;
  
  constructor(private router:Router,private registerService:RegisterService)
  {

  }
  ngOnInit(): void {
    this.createReactiveForm();
    this.subscribeLoginValueChangeToUpdateLoginCheckingInProgressProperty();

  }



  registerNewUser()
  {
    const formInvalid = this.registerForm.invalid;

    if(formInvalid)
    {
      this.markAllInputsAsTouched();
      return;
    }

    const newUser:UserRegisterLoginDTO=this.getObjectFromForm();
    this.registerService.register(newUser);

    this.router.navigate(['/registerOperationResult'])

  }

  isLoginAvailableValidator(control:AbstractControl):Observable<ValidationErrors|null>
  {
    
    
    this.loginStatus=LoginStatus.CHECKING_IN_PROGRESS
    
    let loginCheckingObservable=this.registerService.isLoginAvailable(control.value);
    loginCheckingObservable=loginCheckingObservable.pipe(
      tap( this.setLoginStatusBasedOnBackendInfo()),
      map(this.transformToNullAndErrorMessage()) 
    )

    return loginCheckingObservable;
  }


  getObjectFromForm():UserRegisterLoginDTO
  {
    const login:string=this.registerForm.get("login")?.value;
    const password=this.registerForm.get("password")?.value;
    let newUser:UserRegisterLoginDTO=new UserRegisterLoginDTO(login,password);
    return newUser;
  }

  hasDigit(control: AbstractControl): ValidationErrors | null
  {
      const password=control.value;
      const hasDigit=/\d/.test(password);

      if(hasDigit)
        return null
      else
        return {
          hasDigit:true
        };

  }

  hasUperCase(control: AbstractControl): ValidationErrors | null
  {
      const password=control.value;
      const hasUperCase=/[A-Z]/.test(password);

      if(hasUperCase)
        return null
      else
        return {
          hasUperCase:true
        };

  }



  isLoginNotAvailable(){
    return this.loginStatusForFrontend===LoginStatus.NOT_AVAILABLE;
  }

  isLoginAvailableAndNoOtherLoginValidationError()
  {
    
    return this.loginStatusForFrontend===LoginStatus.AVAILABLE && !this.isInputInvalidWithValidator("login","required");
  
  }
  isCheckingLoginInProgress()
  {
    return this.loginStatusForFrontend===LoginStatus.CHECKING_IN_PROGRESS;
  }
  isInputInvalidAndTouched(inputName:string)
  {

    return this.registerForm.get(inputName)?.invalid && this.registerForm.get(inputName)?.touched
  }
  isRepeatPasswordInvalidAndTouched()
  {
    return (this.registerForm.get("repeatPassword")?.invalid || this.isFormInvalidWithValidator("mustMatch"))  && this.registerForm.get("repeatPassword")?.touched
  }
  isInputInvalidWithValidator(inputName:string,validatorName:string)
  {
    return this.registerForm.get(inputName)?.errors?.[validatorName];
  }
  isFormInvalidWithValidator(validatorName:string)
  {
    return this.registerForm.errors?.[validatorName];
  }

  isRepeatPasswordInvalid()
  {
    return this.isInputInvalidAndTouched('repeatPassword') || this.isFormInvalidWithValidator('mustMatch')
  }


  repeatPasswordValidation(form: AbstractControl): ValidationErrors | null {

    
    
    const password = form?.get("password")?.value;
    const repeatPassword = form?.get("repeatPassword")?.value;
    
    if (password !== repeatPassword) {
      
      return { mustMatch: true };
    } 
    return null;
    
  }








  private transformToNullAndErrorMessage(): (value: boolean, index: number) => { loginAvailableError: boolean; } | null {
    return (loginAvailable) => {
      
      if (loginAvailable)
        return null;


      else
        return { loginAvailableError: true };
    };
  }

  private setLoginStatusBasedOnBackendInfo() {
    return {
      next: (loginAvailable: boolean) => {
        
        if (loginAvailable)
        {
          this.loginStatus = LoginStatus.AVAILABLE;
        }
        else{
          this.loginStatus = LoginStatus.NOT_AVAILABLE;
          
        }
        this.loginStatusForFrontend=this.loginStatus
      }
    };
  }

  private markAllInputsAsTouched() {
    this.registerForm.get("password")?.markAsTouched();
    this.registerForm.get("repeatPassword")?.markAsTouched();
    this.registerForm.get("login")?.markAsTouched();
  }

  
  private subscribeLoginValueChangeToUpdateLoginCheckingInProgressProperty() {
    const loginInput = this.registerForm.get("login");
    loginInput?.valueChanges.pipe(
      debounceTime(100)
    ).subscribe(
      {
        next: (value) => {
          if(this.loginStatus===LoginStatus.CHECKING_IN_PROGRESS )
            this.loginStatusForFrontend=this.loginStatus;
          
        }
      }
    );
  }

  private createReactiveForm() {
    this.registerForm = new FormGroup({
      login: new FormControl('', Validators.required, [this.isLoginAvailableValidator.bind(this)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), this.hasDigit.bind(this), this.hasUperCase.bind(this)]),
      repeatPassword: new FormControl('', Validators.required)
    },
      { validators: this.repeatPasswordValidation.bind(this) }
    );
  }
}


