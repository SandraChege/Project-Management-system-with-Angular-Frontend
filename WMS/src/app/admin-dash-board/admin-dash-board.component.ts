import { Component } from '@angular/core';
import { ApihttpService } from '../services/apihttp.service';
import { AllUserDetails } from '../interface/UserDetails';
import { Router } from '@angular/router';
import { UserDetails } from '../interface/registeruser';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent {
  logo:string = "https://www.freepnglogos.com/uploads/water-drop-png/water-drop-logo-transparentpng-6.png"


  today:Date = new Date();

  constructor(private router:Router) {

  }
  
  logOut() {
    localStorage.clear();

    this.router.navigate(['/login'])

  }
}
