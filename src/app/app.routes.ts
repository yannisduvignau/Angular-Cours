import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: 'courses', pathMatch: 'full' }, // Redirige vers la liste des cours par défaut
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'courses', component:CoursesComponent },
      { path: 'course/:id', component:CourseComponent },
      { path: 'categories', component:CategoriesComponent },
      { path: 'category/:id', component:CategoryComponent },
    ]
  },
];

