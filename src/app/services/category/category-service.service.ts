import { Injectable } from '@angular/core';
import { Category } from '../../model/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/Category';  // L'URL de votre API

  getCategoriesData():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }
}
