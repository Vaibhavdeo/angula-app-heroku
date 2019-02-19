import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Headers  } from '@angular/http';

@Injectable()
export class AuthService {

  currentUser: any; 

  constructor(private http: Http, private router: Router) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://login-auth-service.herokuapp.com/api/authentication', JSON.stringify(credentials), { headers: headers})
    .map(response => {
      let result = response.json();
      
      if (result && result.token) {
        localStorage.setItem('token', result.token);

        let jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

        return true; 
      }
      else return false; 
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {

     let jwtHelper = new JwtHelper();
     let token = localStorage.getItem('token');
     if(!token)
     return false;

     let expirationDate =  jwtHelper.getTokenExpirationDate(token);
     let isExpired = jwtHelper.isTokenExpired(token);

       return !isExpired;
  }

}
