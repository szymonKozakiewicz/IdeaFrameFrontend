import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserRegisterLoginDTO } from 'src/app/core/dto/user-register-login.dto';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { LoginService } from 'src/app/core/services/login.service';
import { LogoComponent } from 'src/app/presentation/logo/logo.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isMouseHoverRegister:boolean=false;
  loginForm!:FormGroup;
  invalidLoginOrPassword:boolean=false;
  loginOperationStatus:OperationStatus=OperationStatus.NOT_STARTED

  constructor(private loginService:LoginService, private roter:Router)
  {

  }

  ngOnInit(): void {
      this.loginForm=new FormGroup({
        login:new FormControl('',Validators.required),
        password:new FormControl('',[Validators.required])
    })
    this.loginService.loginState$.subscribe({
      next:this.finalizeLogin.bind(this)
    })
  }

  initLogin()
  {
    const formInvalid = this.loginForm.invalid;
    if(formInvalid)
    {
      this.markAllInputsAsTouched();
      return;
    }
    const userObject=this.getObjectFromForm();
    this.loginOperationStatus=OperationStatus.IN_PROGRESS;
    this.loginService.login(userObject);

  }

  isLoginProcessInProgress(){
    return this.loginOperationStatus===OperationStatus.IN_PROGRESS;
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
  

  getObjectFromForm() {
    const loginName=this.loginForm.get('login')?.value;
    const password=this.loginForm.get('password')?.value;
    const resultObject= new UserRegisterLoginDTO(loginName,password);
    return resultObject;
  }

  finalizeLogin(loginSuccess:boolean){
    if(loginSuccess)
    {
      this.roter.navigate(['/userPanel']);
      this.loginOperationStatus=OperationStatus.SUCCESS;
    }else{
      this.invalidLoginOrPassword=true;
      this.loginOperationStatus=OperationStatus.FAILURE;
    }
    

  }

  private markAllInputsAsTouched() {
    this.loginForm.get("password")?.markAsTouched();
    this.loginForm.get("repeatPassword")?.markAsTouched();
    this.loginForm.get("login")?.markAsTouched();
  }

}
