import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllUserDetails } from '../interface/UserDetails';
import { UserDetails } from '../interface/registeruser';

@Injectable({
  providedIn: 'root'
})
export class ApihttpService {

  constructor(private http: HttpClient) { }
  
  getAllUserDetails() {
    let token = localStorage.getItem('token') as string

    let response =this.http.get<{users: AllUserDetails[]}>('http://localhost:4600/user/',
    {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: token,
      }),
    })
    return response;
  }
}
