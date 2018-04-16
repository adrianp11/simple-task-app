import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  public newPosts = new Subject<Post>();

  constructor(public http:HttpClient) { 
    console.log('Data service connected...');
  }

  getPosts(){
    this.http.get<Post[]>(
      'http://localhost:8000/posts'
    ).subscribe(data => {
      return data
    })
  }

  getCategories(){
    return this.http.get<string[]>(
      'http://localhost:8000/categories'
    )
  }

  addPost(newPost){
    this.newPosts.next(newPost);
  }
}
