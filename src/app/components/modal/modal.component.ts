import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post';
import { DataService } from "../../services/data.service";
declare var $:any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() addPostEvent = new EventEmitter();
  categories:string[];
  rForm:FormGroup;
  titleAlert:string = 'This field is required';


  constructor(private http:HttpClient, private formBuilder:FormBuilder, public dataService:DataService) { 
    console.log('Post Modal running...');
    this.rForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'body' : [null, Validators.required],
      'category' : '1',
      'subject' : ''
    });
  }

  ngOnInit() {
    this.http.get<string[]>(
      'http://localhost:8000/categories'
    ).subscribe(data => {
      this.categories = data
    })
  }

  addPost(post){
    this.http.post(
      'http://localhost:8000/post',
      post
    ).subscribe(data => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error){
          console.log("Client-side Error occured.");
        } else {
          console.log("Server-side Error occured.");
        }
      }
    );

    $('#postModal').modal('hide');
    this.dataService.addPost(post);
  }
}
