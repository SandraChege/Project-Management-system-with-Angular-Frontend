import { Component } from '@angular/core';
import { ApihttpService } from '../services/apihttp.service';
import { AllUserDetails } from '../interface/UserDetails';
import { Router } from '@angular/router';
import { UserDetails } from '../interface/registeruser';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.css'],
})
export class GetusersComponent {
    logo:string = "https://www.freepnglogos.com/uploads/water-drop-png/water-drop-logo-transparentpng-6.png"
    allUsers: AllUserDetails[] = [];
    appUsers: any;
    today: Date = new Date();

  constructor(private apihttp: ApihttpService, private router: Router) {
    this.getAllUserDetails();
  }

  logOut() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  getAllUserDetails() {
    let res = this.apihttp.getAllUserDetails().subscribe((res) => {
      this.allUsers = res.users;
    });
  }
}
