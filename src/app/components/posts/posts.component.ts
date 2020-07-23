import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/PostModel';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: []
})
export class PostsComponent implements OnInit {

  posts: PostModel;
  showAddPost: boolean = false;
  newPost: boolean = true;
  id: number = 0;

  constructor(private postSvc: PostsService) { 
    this.postSvc.getPosts().subscribe((data: PostModel) => {
      this.posts = data;
    })
  }

  ngOnInit() {
  }

  showForm(show: boolean){
    this.showAddPost = show;
  }

  savePost(description: string){
    if(this.newPost){
      this.postSvc.AddPost(description);
    }
    else{
      this.postSvc.UpdatePost(this.id, description);
    }
    
    this.showForm(false);
  }

  removePost(id: number){
    this.postSvc.DeletePost(id);
  }

  modifyPost(id: number, description: string){
    this.showForm(true);
    this.posts.descriptionPost = description;
    this.newPost = false;
    this.id = id;
  }


}
