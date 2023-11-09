import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  // RegistrationForm is of type formGroup and has no form controls
  // FormGroup is a container for form controls.
  // registrationForm is an instance of a FormGroup.
  registrationForm!: FormGroup;
  constructor(private authService: AuthserviceService, private router:Router) {
    
    this.registrationForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_no: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    
  }
  registerNewUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm);
      this.authService.registerNewUser(this.registrationForm.value).then(() => {
      this.router.navigate(["login"])
    })
    }
  }
}
