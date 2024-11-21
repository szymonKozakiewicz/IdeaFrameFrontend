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


@NgModule({
  declarations: [AppComponent,LogoComponent,WelcomeComponent,LoginComponent, FormFrameRegisterLoginComponent, RegisterComponent],
  imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
  bootstrap:[AppComponent]
})
export class AppModule { }

