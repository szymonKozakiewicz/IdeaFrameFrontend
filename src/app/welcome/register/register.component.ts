import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup

  ngOnInit(): void {
    this.registerForm=new FormGroup({
        login:new FormControl('',Validators.required),
        password:new FormControl('',[Validators.required, Validators.minLength(6)]),
        repeatPassword:new FormControl('',Validators.required)
    },
    {validators:this.repeatPasswordValidation.bind(this)}
    )

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


  repeatPasswordValidation(form: AbstractControl): ValidationErrors | null {

    
    
    const password = form?.get("password")?.value;
    const repeatPassword = form?.get("repeatPassword")?.value;

    if (password !== repeatPassword) {
      
      return { mustMatch: true };
    } 
    return null;
    
  }

  registerNewUser()
  {
    const formInvalid = this.registerForm.invalid;
    if(formInvalid)
    {
      this.markAllInputsAsTouched();
      return;
    }
  }

  private markAllInputsAsTouched() {
    this.registerForm.get("password")?.markAsTouched();
    this.registerForm.get("repeatPassword")?.markAsTouched();
    this.registerForm.get("login")?.markAsTouched();
  }
}
