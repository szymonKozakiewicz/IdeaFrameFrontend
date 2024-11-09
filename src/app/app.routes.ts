import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { RegisterComponent } from './welcome/register/register.component';

export const routes: Routes = [

    {path:'',component: WelcomeComponent},
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent}
];
