import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { getAllProjectDetails } from '../interface/getallprojectdetails';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent {
  logo: string =
    'https://www.freepnglogos.com/uploads/water-drop-png/water-drop-logo-transparentpng-6.png';

  today: Date = new Date();
  allProjectDetails: any;
  //allProjectDetails: getAllProjectDetails[]=[];

  constructor(private router: Router, private projService: ProjectService) {
    this.getAllProjects();
  }

  //LOGOUT
  logOut() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  //DISPLAY ALL PROJECTS
  getAllProjects() {
    this.projService.getAllProjects().subscribe(
      (res) => {
        console.log(res);
        this.allProjectDetails = res;
        console.log(this.allProjectDetails);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        // Handle the error, e.g., display an error message to the user
      }
    );
  }
  //DELETE PROJECT
  deleteProject(projectID: string) {
    console.log('Deleting project with ID:' + projectID);

    this.projService.deleteProject(projectID).subscribe(() => {
      console.log("Project deleted");
      this.getAllProjects();
    }, (error) => {
       console.error('Error deleting project', error);
    }
    )
  }
  //PROJECT DETAILS
}
