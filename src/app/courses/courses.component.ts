import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Course } from '../Model/course';
import { NgFor, NgIf } from '@angular/common';
import { CourseServiceService } from '../services/course/course-service.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ReactiveFormsModule,RouterLink,RouterLinkActive,NgxPaginationModule,CourseComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  /*----------------------------
          CONSTRUCTEUR
  ----------------------------*/

  constructor(
    private courseService: CourseServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  /*----------------------------
            VARIABLES
  ----------------------------*/
  // texte: string = "composant courses";
  // author: string = "Auteur";
  // twBinding!: string;

  title!: string;
  courses!: Course[];
  coursesData!: Course[];

  idCourse!: string;
  theCourse!: Course | undefined;

  formulaire!: FormGroup;

  deleteForm!: FormGroup;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;


  /*----------------------------
            FONCTIONS
  ----------------------------*/

  /**
   * Get the texte attribute
   *
   * @return string
   */
  // getText():string{
  //   return this.texte;
  // }



  /**
   * Change the texte attribute
   *
   * @return void
   */
  // updateText():void{
  //   this.texte= "nouveau-titre"
  // }



  /**
   *
   *
   * @return void
   */
  triggerSuccess(message:string) {
    this.notificationService.showSuccess(message);
  }



  /**
   *
   *
   * @return void
   */
  triggerError(message:string) {
    this.notificationService.showError(message);
  }



  /**
   *
   *
   * @return void
   */
  onNewNb($event:number) {
    console.log($event)
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
        this.totalPages = Math.ceil(this.coursesData.length / this.itemsPerPage);
        // this.triggerSuccess("Données récupérées avec succès !");
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
        // this.triggerError("Erreur lors de la récupération des données");
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
      nbEtud: [0, Validators.required],
      descriptionLongue: ['', Validators.required],
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
  getParams(): void {
    // Récupérer l'ID via un paramètre de requête
    this.route.queryParams.subscribe(params => {
      this.idCourse = params['id'];
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
          descriptionLongue: this.formulaire.get('descriptionLongue')?.value,
        };

        this.courseService.addCourse(newCourse).subscribe({
          next: (course) => {
            this.coursesData.push(course);
            this.triggerSuccess("Cours ajouté avec succès !");
            this.loadCourses();
            this.formulaire.reset();
          },
          error: (err) => {
            console.log('Erreur lors de l\'ajout du cours :' + err);
            //alert("Le cours n'a pas pu être ajouté.");
            this.triggerError("Le cours n'a pas pu être ajouté.");
          }
        });
      });
    } else {
      //alert("Veuillez remplir tous les champs du formulaire.");
      this.triggerError("Veuillez remplir tous les champs du formulaire.");
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
  deleteCourse(): void {
    const courseId = this.deleteForm.get('courseId')?.value;

    if (courseId) {
      console.log(courseId)
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.loadCourses();
          this.deleteForm.reset();
        },
        error: (err) => {
          //console.log('Erreur lors de l\'ajout du cours :' + err);
          //alert("Le cours n'a pas pu être ajouté.");
          this.triggerError("Le cours n'a pas pu être supprimé.");
        }
      });
    } else {
      this.triggerError('Veuillez sélectionner un cours valide.');
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
  ngOnInit(): void {
    this.title = "Liste de cours";
    this.courses = this.courseService.getCourses();

    this.loadCourses();

    this.initializeForms();

    this.getParams();

  }
}
