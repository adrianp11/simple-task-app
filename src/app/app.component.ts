import { Component, OnInit, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from './interfaces/post';
import { post } from 'selenium-webdriver/http';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title:string;
  author:string;z
  posts:Post[];
  categories:string[];

  constructor(private http:HttpClient, private sanitizer:DomSanitizer, private dataService:DataService){
    console.log('App running...');
  }
  ngOnInit() {
    this.title = 'GWAT Simple Task 1';
    this.author = 'Adrian Palenzuela';
    this.getPosts();

    this.dataService.getCategories().subscribe(
      data => this.categories = data
    );

    this.dataService.newPosts.subscribe(
      data => {
        data.category = this.categories[data.category];
        this.posts.unshift(data);
      }
    );
  }

  getUrl(i) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(i);
  }
  
  getPosts(){
    this.http.get<Post[]>(
      'http://localhost:8000/posts'
    ).subscribe(data => {
      this.posts = data.sort(this.compare);
    });
  }

  compare(a:Post,b:Post){
    if(a.id > b.id){
      return -1;
    } else if(a.id < b.id){
      return 1;
    } else {
      return 0;
    }
  }

}
