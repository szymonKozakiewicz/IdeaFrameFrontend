import { Routes } from '@angular/router';
import { WelcomeComponent } from './presentation/welcome/welcome.component';
import { LoginComponent } from './presentation/welcome/login/login.component';
import { RegisterComponent } from './presentation/welcome/register/register.component';
import { OperationResultComponent } from './presentation/operations-results/operation-result/operation-result.component';
import { RegisterOperationResultComponent } from './presentation/operations-results/register-operation-result/register-operation-result.component';


export const routes: Routes = [

    {path:'',component: WelcomeComponent},
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'registerOperationResult',component: RegisterOperationResultComponent}
];
