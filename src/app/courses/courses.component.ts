import { provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../Model/course';
import { NgFor } from '@angular/common';
import { CourseServiceService } from '../services/course-service.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, NgFor],
  providers: [provideHttpClient()],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  constructor(private courseService : CourseServiceService) { }

  texte:string = "composant courses";
  author:string = "Auteur";
  twBinding !:string;

  title!: string;
  courses!:Course[];
  coursesData!:Course[];

  getText(){
    return this.texte;
  }

  updateText(){
    this.texte= "nouveau-titre"
  }

  ngOnInit(): void {
    this.title = "Liste de cours";
    this.courses = this.courseService.getCourses()
    // Récupérer les données depuis l'API
    this.courseService.getCoursesData().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
}
