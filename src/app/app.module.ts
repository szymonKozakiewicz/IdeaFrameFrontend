import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './presentation/app-routing/app-routing.module';
import { LogoComponent } from './presentation/logo/logo.component';
import { WelcomeComponent } from './presentation/welcome/welcome.component';
import { LoginComponent } from './presentation/welcome/login/login.component';
import { FormFrameRegisterLoginComponent } from './presentation/welcome/form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from './presentation/welcome/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperationResultComponent } from './presentation/operations-results/operation-result/operation-result.component';
import { RegisterOperationResultComponent } from './presentation/operations-results/register-operation-result/register-operation-result.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UserPanelComponent } from './presentation/user-panel/user-panel.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';




@NgModule({
  declarations: [OperationResultComponent,
    AppComponent,
    LogoComponent,
    WelcomeComponent,
    LoginComponent, 
    FormFrameRegisterLoginComponent, 
    RegisterComponent,
    RegisterOperationResultComponent,
    UserPanelComponent],
  imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule,HttpClientModule],
  bootstrap:[AppComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
    , 
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AppModule { }

