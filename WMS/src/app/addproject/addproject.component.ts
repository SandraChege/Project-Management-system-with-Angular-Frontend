import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ApihttpService } from '../services/apihttp.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent implements OnInit {
  logo: string =
    'https://www.freepnglogos.com/uploads/water-drop-png/water-drop-logo-transparentpng-6.png';

  today: Date = new Date();
  addProjectForm!: FormGroup;

  employees: string[] = [];
  emails: string[] = [];
  filteredEmployees: string[] = [];

  constructor(
    private router: Router,
    private pService: ProjectService,
    private apihttp: ApihttpService
  ) {
    this.addProjectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      AssignedUserName: new FormControl('', Validators.required),
      AssignedUserEmail: new FormControl('', Validators.required),
    });
  }

  logOut() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // Fetch employees and emails from the server using ApihttpService
    this.apihttp.getAllUserDetails().subscribe(
      (data) => {
        this.employees = data.users.map((user) => user.userName);
        this.emails = data.users.map((user) => user.email);
        console.log(this.employees);
        console.log(this.emails);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );

    this.addProjectForm
      .get('AssignedUserName')!
      .valueChanges.subscribe((selectedEmployee: string) => {
        const emailIndex = this.employees.indexOf(selectedEmployee);
        if (emailIndex !== -1) {
          this.addProjectForm
            .get('AssignedUserEmail')!
            .setValue(this.emails[emailIndex]);
        } else {
          this.addProjectForm.get('AssignedUserEmail')!.setValue(''); // Reset email if the employee is not found
        }
      });

    // Filter out assigned employees from the options
    this.addProjectForm.get('AssignedUserName')!.valueChanges.subscribe(() => {
      const assignedEmployee =
        this.addProjectForm.get('AssignedUserName')!.value;
      this.filteredEmployees = this.employees.filter(
        (employee) => employee !== assignedEmployee
      );
    });
  }


  addNewProject() {
    if (this.addProjectForm.valid) {
      console.log(this.addProjectForm);
      this.pService.addNewProject(this.addProjectForm.value).then(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
