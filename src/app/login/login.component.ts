import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  invalidLogin: boolean;
   constructor(
     private router: Router ,
     private authService: AuthService
   ){
     if(authService.isLoggedIn()){
      this.router.navigate(['/myapp']);
     }
   }

  signIn(credentials) {

    this.authService.login(credentials)
    .subscribe(result => { 
      if (result)
        this.router.navigate(['/myapp']);
      else  
        this.invalidLogin = true; 
    });
  }

}


