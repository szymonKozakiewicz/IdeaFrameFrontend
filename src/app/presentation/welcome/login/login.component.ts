import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogoComponent } from 'src/app/presentation/logo/logo.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isMouseHoverRegister:boolean=false;
  loginForm!:FormGroup
  ngOnInit(): void {
      this.loginForm=new FormGroup({
        login:new FormControl('',Validators.required),
        password:new FormControl('',[Validators.required])
    })
  }
  setMouseHoverRegister(isHover:boolean)
  {
    this.isMouseHoverRegister=isHover;
  }
  isInputInvalidAndTouched(inputName:string)
  {
    return this.loginForm.get(inputName)?.invalid && this.loginForm.get(inputName)?.touched
  }
  isInputInvalidWithValidator(inputName:string,validatorName:string)
  {
    return this.loginForm.get(inputName)?.errors?.[validatorName];
  }
  
  login()
  {
    const formInvalid = this.loginForm.invalid;
    if(formInvalid)
    {
      this.markAllInputsAsTouched();
      return;
    }

  }

  private markAllInputsAsTouched() {
    this.loginForm.get("password")?.markAsTouched();
    this.loginForm.get("repeatPassword")?.markAsTouched();
    this.loginForm.get("login")?.markAsTouched();
  }

}
