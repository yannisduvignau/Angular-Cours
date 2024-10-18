import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'courses', component:CoursesComponent},
  {path: 'course/:id', component:CourseComponent},
  // { path: '', redirectTo: 'courses', pathMatch: 'full' }, // Redirige vers la liste des cours par défaut
];

