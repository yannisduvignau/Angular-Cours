import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoursesComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projet_Bachelor';
}
