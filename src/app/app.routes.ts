import { Routes } from '@angular/router';
import { WelcomeComponent } from './presentation/welcome/welcome.component';
import { LoginComponent } from './presentation/welcome/login/login.component';
import { RegisterComponent } from './presentation/welcome/register/register.component';

export const routes: Routes = [

    {path:'',component: WelcomeComponent},
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent}
];
