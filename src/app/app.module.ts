import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LogoComponent } from './logo/logo.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { FormFrameRegisterLoginComponent } from './welcome/form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from './welcome/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent,LogoComponent,WelcomeComponent,LoginComponent, FormFrameRegisterLoginComponent, RegisterComponent],
  imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
  bootstrap:[AppComponent]
})
export class AppModule { }

