import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,AppRoutingModule],
  bootstrap:[AppComponent]
})
export class AppModule { }

