import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component'
@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginuserComponent,
    AdminDashBoardComponent,
    LandingPageComponent,
    UserdashboardComponent,
    NotfoundComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
