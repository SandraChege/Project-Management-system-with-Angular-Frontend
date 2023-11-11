import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAllProjectDetails } from '../interface/getallprojectdetails';
import { Observable } from 'rxjs';
import { addNewProjectDetails } from '../interface/addProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  //ADD NEW PROJECT
  async addNewProject(projectdetail: addNewProjectDetails) {
    let response = await fetch('http://localhost:4600/project/assignProject', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(projectdetail),
    });

    const data = await response.json();

    console.log(data);

    return data;
  }

  //FETCH ALL PROJECTS
  getAllProjects() {
    let response = this.http.get<{ project: getAllProjectDetails[] }>(
      'http://localhost:4600/project/',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        }),
      }
    );
    return response;
  }


  deleteProject(projectID: string): Observable<any> {
    const requestBody = { deleteID: projectID };

    let response = this.http.delete(
      'http://localhost:4600/project/deleteProject/',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: requestBody,
      }
    );
    return response;
  }
}
