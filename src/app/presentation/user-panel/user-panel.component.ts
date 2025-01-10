import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UserPanelService } from 'src/app/core/services/user-panel.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent {

  constructor(private loginService:LoginService,private userPanelService:UserPanelService,private router:Router) { }
  
  logOut()
  {
    this.loginService.removeTokenFromLocalStorage();
    this.router.navigate(['']);
    

  }

  sendAuthorizedRequest()
  {
    this.userPanelService.sendAuthorizedRequest();
  }

  sendNotAuthorizedRequest()
  {
    this.loginService.removeTokenFromLocalStorage();
    this.userPanelService.sendAuthorizedRequest();
  }
}
