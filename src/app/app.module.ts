import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { 
  HeaderComponent,
  FooterComponent,
  SharedModule } from  './shared';

import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
