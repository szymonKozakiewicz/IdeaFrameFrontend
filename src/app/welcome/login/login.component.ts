import { Component } from '@angular/core';
import { LogoComponent } from 'src/app/logo/logo.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isMouseHoverRegister:boolean=false;


  setMouseHoverRegister(isHover:boolean)
  {
    this.isMouseHoverRegister=isHover;
  }

}
