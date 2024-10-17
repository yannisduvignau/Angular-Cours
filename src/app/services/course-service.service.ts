import { Injectable } from '@angular/core';
import { Course } from '../Model/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/Course';  // L'URL de votre API

  getCourses():Course[]{
    return [
      {title: "C1", description: "Cours HTML/CSS", nbEtud:10},
      {title: "C2", description: "Cours Angular", nbEtud:10},
      {title: "C3", description: "Cours JS/TS", nbEtud:10}
    ]
  }

  getCoursesData():Observable<Course[]>{
    return this.http.get<Course[]>(this.apiUrl);
  }
}
