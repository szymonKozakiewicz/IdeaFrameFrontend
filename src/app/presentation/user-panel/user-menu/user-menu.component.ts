import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {
  @Input("userName")userName!:string;
  
  constructor(private loginService:LoginService, private router:Router) { }



  logOut()
  {

    this.loginService.logout();

    this.router.navigate(['']);
    

  }

  getFirst8LattersOfUserName():string
  {
    if(this.userName.length<=8)
    {
      return this.userName
    }

    return this.userName.substring(0,8)+"...";
  }

  ignore()
  {

  }
}
