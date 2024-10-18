import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../Model/course';
import { NgFor, NgIf } from '@angular/common';
import { CourseServiceService } from '../services/course-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'] // Correction ici (styleUrls)
})
export class CoursesComponent implements OnInit {

  constructor(
    private courseService: CourseServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder // Utilisation de FormBuilder pour créer le FormGroup
  ) { }

  texte: string = "composant courses";
  author: string = "Auteur";
  twBinding!: string;

  title!: string;
  courses!: Course[];
  coursesData!: Course[];

  idCourse!: string;
  theCourse!: Course | undefined;

  formulaire!: FormGroup;
  successMessage: string = '';

  deleteForm!: FormGroup;
  errorMessage: string = '';



  /**
   *
   *
   *
   *
   *
   *
   */
  getText(){
    return this.texte;
  }



  /**
   *
   *
   *
   *
   *
   *
   */
  updateText(){
    this.texte= "nouveau-titre"
  }



  /**
   *
   *
   *
   *
   *
   *
   */
  loadCourses(): void {
    this.courseService.getCoursesData().subscribe(
      (data: Course[]) => {
        this.coursesData = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }



  /**
   *
   *
   *
   *
   *
   *
   */
  initializeForms(): void {
    this.deleteForm = this.fb.group({
      courseId: ['', [Validators.required]] // Validation requise pour l'ID
    });

    this.formulaire = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      nbEtud: [0, Validators.required]
    });
  }




  /**
   *
   *
   *
   *
   *
   *
   */
  ngOnInit(): void {
    this.title = "Liste de cours";
    this.courses = this.courseService.getCourses();

    this.loadCourses();

    this.initializeForms();

    // Récupérer l'ID via un paramètre de requête
    this.route.queryParams.subscribe(params => {
      this.idCourse = params['id'];
      console.log('ID récupéré :', this.idCourse);

      if (this.idCourse) {
        this.courseService.getCourseDataById(+this.idCourse).subscribe({
          next: (theCourse) => {
            if (Array.isArray(theCourse) && theCourse.length > 0) {
              this.theCourse = theCourse[0];
            } else {
              this.theCourse = undefined;
            }

            console.log('Cours récupéré :', this.theCourse);
          },
          error: (err) => {
            console.error('Erreur lors de la récupération du cours:', err);
          }
        });
      }
    });

  }


  /**
   *
   *
   *
   *
   *
   *
   */
  addNewCourse(): void {
    if (this.formulaire.valid) {
      this.courseService.getLastCourseId().subscribe(lastId => {
        let newCourse: Course = {
          id: lastId + 1,
          title: this.formulaire.get('title')?.value,
          description: this.formulaire.get('description')?.value,
          nbEtud: this.formulaire.get('nbEtud')?.value,
        };

        this.courseService.addCourse(newCourse).subscribe({
          next: (course) => {
            this.coursesData.push(course);
            this.successMessage = "Cours ajouté avec succès !";
            this.loadCourses();
            this.formulaire.reset();
          },
          error: (err) => {
            console.log('Erreur lors de l\'ajout du cours :' + err);
            alert("Le cours n'a pas pu être ajouté.");
          }
        });
      });
    } else {
      alert("Veuillez remplir tous les champs du formulaire.");
    }
  }


  /**
   *
   *
   *
   *
   *
   *
   */
  // Fonction pour supprimer un cours
  deleteCourse(): void {
    const courseId = this.deleteForm.get('courseId')?.value;

    if (courseId) {
      console.log(courseId)
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses();
          this.deleteForm.reset();
        }
      });
    } else {
      this.errorMessage = 'Veuillez sélectionner un cours valide.';
    }
  }
}
