import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/PostModel';

const URL_POSTS = 'https://localhost:44385/api/posts';

const URL_POSTS2 = 'https://localhost:44385/api/posts/delete/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { 

  }

  getPosts(){
    return new Observable(observer => {
      this.http.get(URL_POSTS).subscribe((data: PostModel[]) => {
        observer.next(data);
      });
    })
  }

  AddPost(description: string){
    this.http.post(URL_POSTS,

    {
      "descriptionPost": description
    })
    .subscribe(
        data  => {
        alert("Post Registered");
        location.reload();
      },

      error  => {
        console.log("Error", error);
      }

    );
  }

  UpdatePost(id:number, description: string){

    this.http.put(URL_POSTS,
      {
        "idPost": id,
        "descriptionPost": description,
      })  
      .subscribe(
          data  => {
          alert("Post Updated");
          location.reload();
        },
  
        error  => {
          console.log("Error", error);
        }
  
      );
  }

  DeletePost(id: number){
    this.http.delete(URL_POSTS2+id).subscribe(data => {
      alert("Post Removed");
      location.reload();
    });


  }

}
