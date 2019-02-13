import {Component, OnInit , Input} from '@angular/core';
import {PostService} from '../services/post.service';
import {Observable} from 'rxjs/Observable';
import {AppError} from '../common/app-error';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent  implements OnInit{

  posts: any[];
  events: any[];
  rowFlag : boolean;

  constructor(private service: PostService) {
    console.log("Events", this.events);
  }


    ngOnInit(){
      this.service.getAll().subscribe(response => {
       // console.log("response.get",response);
        this.posts=response.json();
      }, error => {
        alert('An Unexpected error has occurs'+error);
        console.log(error);
      });
    }
  createPosts(post){
    if(!this.rowFlag){
      this.updatePost(post);
      this.rowFlag=false;
    }
    else{
  this.service.create(post).subscribe(response => {
    post['id']= response.json().id;
   // this.posts.splice(0,0,post)
    alert('Record Added successfully');
  }, error => {
    alert('An Unexpected error has occurs');
    console.log(error);
  });
  }
}

  updatePost(post){
      this.service.update(post).subscribe(response => {
        console.log(response.json());
        alert('Record Updated successfully');
      }, error => {
        alert('An Unexpected error has occurs');
        console.log(error);
      });

    //this.http.post(this.url,JSON.stringify(post));
  }

  addRow () {
    this.rowFlag = true;
    this.posts.push({
      gId: '',
      mailId: '',
      name: '',
      subject: '',
      date: ''
    });
  }

  deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1);
    this.service.delete(post.gId).subscribe(response =>{
      console.log('Responce' , response);
      },
      error => {
      if ( error.status === 404){
        this.posts.splice(index,0,post);
        alert('The resource already has been deleted');
        console.log(error);
      }
      else {
        alert('An Unexpected error has occurs');
        console.log(error);
      }
    });
  }
}
