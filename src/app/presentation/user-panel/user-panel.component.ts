import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UserPanelService } from 'src/app/core/services/user-panel.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit  {
  userMenuVisible:boolean=false;
  userNameFirstLatter:string="default value";
  userNameFirst8Latters:string="default value";
  userName:string="default value";
  
  constructor(private loginService:LoginService,private userService:UserService,private userPanelService:UserPanelService,private router:Router)
  { 

  }


  ngOnInit(): void {

    
    this.userName=this.userService.getUserName();

    
  }
  
  logOut()
  {

    this.loginService.logout();

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

  toggleUserMenu()
  {
    this.userMenuVisible=!this.userMenuVisible;
 
  }
}
