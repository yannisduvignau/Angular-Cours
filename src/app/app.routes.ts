import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'courses', component:CoursesComponent,canActivate: [AuthGuard]},
  {path: 'course/:id', component:CourseComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: 'courses', pathMatch: 'full' }, // Redirige vers la liste des cours par défaut
];

