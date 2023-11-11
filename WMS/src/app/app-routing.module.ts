import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { GetusersComponent } from './getusers/getusers.component';
import { AddprojectComponent } from './addproject/addproject.component';

const routes: Routes = [
  //{path: '', pathMatch:'full', redirectTo: ''},
  {path: '', component:LandingPageComponent},
  {path: 'login', component: LoginuserComponent },
  {path: 'register', component: RegisterUserComponent },
  { path: 'admin', component: AdminDashBoardComponent },
  { path: 'user', component: UserdashboardComponent },
  { path: "allusers", component: GetusersComponent },
  {path:'addproject', component:AddprojectComponent},

  
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
