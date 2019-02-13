import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  events: any[];
  constructor(private authService: AuthService, private router: Router, private postService: PostService) { 
    
    if(!authService.isLoggedIn())  
      this.router.navigate(['/login']);      
 
  }

  ngOnInit() {
    this.getEvents();
    }

    getEvents(){
      this.postService.getLatestEvents().subscribe(response => {
        this.events=response.json();
      }, error => {
        //alert('An Unexpected error has occurs');
        console.log(error);
      });
    }
  }


