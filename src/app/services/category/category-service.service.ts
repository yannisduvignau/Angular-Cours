import { Injectable } from '@angular/core';
import { Category } from '../../model/category';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/Category';  // L'URL de votre API

  getCategoriesData():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }

  getLastCategoryId(): Observable<number> {
    return this.getCategoriesData().pipe(
      map(courses => {
        if (courses.length === 0) return 0;

        return Math.max(...courses.map(course => course.id));
      })
    );
  }

  getCategoryDataById(id: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl +'?id='+ id);
  }

  addCategory(newCategory:Category):Observable<Category>{
    return this.http.post<Category>(this.apiUrl, newCategory);
  }

  // Delete n'accepte que la suppression des id en string
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
