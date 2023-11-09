import { Component } from '@angular/core';
import { ApihttpService } from '../services/apihttp.service';
import { AllUserDetails } from '../interface/UserDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent {
  logo:string = "https://www.freepnglogos.com/uploads/water-drop-png/water-drop-logo-transparentpng-6.png"
  allUsers: any
  appUsers: any;
  today:Date = new Date();

  constructor(private apihttp: ApihttpService, private router:Router) {
    this.getAllUserDetails();
  }
  
  logOut() {
    localStorage.clear();

    this.router.navigate(['/login'])

  }

  getAllUserDetails() {
    let res = this.apihttp.getAllUserDetails().subscribe((res) => {
      this.allUsers = res;

      console.log(this.allUsers);

      this.allUsers = this.allUsers.users;
      console.log(this.allUsers);

      // console.log(res);
    });
  }
}
