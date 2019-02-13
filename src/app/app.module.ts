import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {HttpModule, Http, BaseRequestOptions} from '@angular/http';
import {PostService} from './services/post.service';
import { GithubFollowersService } from './services/github-followers.service';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import { DefaultComponent } from './default/default.component';


@NgModule( {
  declarations: [
    AppComponent,
    PostsComponent,
    NavbarComponent,
    LoginComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'myapp',
        component: NavbarComponent
      },
      {
        path: 'details',
        component: PostsComponent
     },
     {
      path: '**',
      component: DefaultComponent
   }
    ])
  ],
  providers: [
    PostService,
    AuthService,
    BaseRequestOptions,
    MockBackend
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
