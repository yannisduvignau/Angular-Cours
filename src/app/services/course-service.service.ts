import { Injectable } from '@angular/core';
import { Course } from '../Model/course';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/Course';  // L'URL de votre API

  getCourses():Course[]{
    return [
      {id:1, title: "C1", description: "Cours HTML/CSS", nbEtud:10},
      {id:2, title: "C2", description: "Cours Angular", nbEtud:10},
      {id:3, title: "C3", description: "Cours JS/TS", nbEtud:10}
    ]
  }

  getLastCourseId(): Observable<number> {
    return this.getCoursesData().pipe(
      map(courses => {
        if (courses.length === 0) return 0;

        return Math.max(...courses.map(course => course.id));
      })
    );
  }

  getCoursesData():Observable<Course[]>{
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseDataById(id: number): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + '?id=' + id);
  }

  addCourse(newCourse:Course):Observable<Course>{
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  // Delete n'accepte que la suppression des id en string
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
