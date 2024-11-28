import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserRegisterLoginDTO } from 'src/app/core/dto/user-register-login.dto';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup

  constructor(private router:Router,private registerService:RegisterService)
  {

  }
  ngOnInit(): void {
    this.registerForm=new FormGroup({
        login:new FormControl('',Validators.required),
        password:new FormControl('',[Validators.required, Validators.minLength(6)]),
        repeatPassword:new FormControl('',Validators.required)
    },
    {validators:this.repeatPasswordValidation.bind(this)}
    )

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
  getObjectFromForm():UserRegisterLoginDTO
  {
    const login:string=this.registerForm.get("login")?.value;
    const password=this.registerForm.get("password")?.value;
    let newUser:UserRegisterLoginDTO=new UserRegisterLoginDTO(login,password);
    return newUser;
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


  private markAllInputsAsTouched() {
    this.registerForm.get("password")?.markAsTouched();
    this.registerForm.get("repeatPassword")?.markAsTouched();
    this.registerForm.get("login")?.markAsTouched();
  }
}


