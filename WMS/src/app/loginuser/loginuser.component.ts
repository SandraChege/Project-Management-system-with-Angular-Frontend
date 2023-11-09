import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css'],
})
export class LoginuserComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthserviceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
    //If my form is valid, log the form 
  loginUser() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm);
      // console.log(this.loginForm.value);

      this.authservice.loginregistereduser(this.loginForm.value).then(
        (data) => {
          // console.log(data); 
          localStorage.setItem('token', data.token);
          this.authservice.checkuserdetails().then((data) => {
            console.log(data);
            console.log(data.info.role);
            if (data.info.role === "employee") {
              this.router.navigate(['user']);
            } else if (data.info.role === "admin") {
              this.router.navigate(['admin']);
            }
          })
        }
      );



    }
  }
}
