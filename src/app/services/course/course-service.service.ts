import { Injectable } from '@angular/core';
import { Course } from '../../model/course';
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
      {id:1, title: "C1", description: "Cours HTML/CSS", nbEtud:10, descriptionLongue:"LoAliquip aliqua nostrud officia sint duis velit. Aliquip culpa dolor cupidatat nostrud laborum qui magna proident deserunt pariatur esse. Eiusmod magna in cupidatat nostrud laborum. Labore laborum do id fugiat. Consequat velit veniam veniam sint irure ad tempor nulla cillum aliqua occaecat ex labore. Aliquip mollit excepteur fugiat qui pariatur cillum voluptate ad. Aliquip laboris consectetur fugiat cillum amet anim eu irure excepteur commodo incididunt qui ipsum."},
      {id:2, title: "C2", description: "Cours Angular", nbEtud:10, descriptionLongue:"LoAliquip aliqua nostrud officia sint duis velit. Aliquip culpa dolor cupidatat nostrud laborum qui magna proident deserunt pariatur esse. Eiusmod magna in cupidatat nostrud laborum. Labore laborum do id fugiat. Consequat velit veniam veniam sint irure ad tempor nulla cillum aliqua occaecat ex labore. Aliquip mollit excepteur fugiat qui pariatur cillum voluptate ad. Aliquip laboris consectetur fugiat cillum amet anim eu irure excepteur commodo incididunt qui ipsum."},
      {id:3, title: "C3", description: "Cours JS/TS", nbEtud:10, descriptionLongue:"LoAliquip aliqua nostrud officia sint duis velit. Aliquip culpa dolor cupidatat nostrud laborum qui magna proident deserunt pariatur esse. Eiusmod magna in cupidatat nostrud laborum. Labore laborum do id fugiat. Consequat velit veniam veniam sint irure ad tempor nulla cillum aliqua occaecat ex labore. Aliquip mollit excepteur fugiat qui pariatur cillum voluptate ad. Aliquip laboris consectetur fugiat cillum amet anim eu irure excepteur commodo incididunt qui ipsum."}
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
    return this.http.get<Course>(this.apiUrl +'?id='+ id);
  }

  addCourse(newCourse:Course):Observable<Course>{
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  // Delete n'accepte que la suppression des id en string
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
