import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LogoComponent } from './logo/logo.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [AppComponent,LogoComponent,WelcomeComponent],
  imports: [BrowserModule,AppRoutingModule],
  bootstrap:[AppComponent]
})
export class AppModule { }

