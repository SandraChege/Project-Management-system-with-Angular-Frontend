import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent {
  logo: string =
    'https://www.freepnglogos.com/uploads/water-drop-png/water-drop-logo-transparentpng-6.png';

  today: Date = new Date();
  addProjectForm!: FormGroup;

  constructor(private router: Router, private pService: ProjectService) {
    this.addProjectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      // employee: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required),
    });
  }

  logOut() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  addNewProject() {
    if (this.addProjectForm.valid) {
      //console.log((this.addNewProject as any). value);
    }
  }
}
