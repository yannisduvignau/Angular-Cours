import { Component, Input } from '@angular/core';
import { Course } from '../Model/course';
import { CourseServiceService } from '../services/course/course-service.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {
  @Input() Course!: Course;
  theCourse!: Course | undefined;
  idCourse!: number;

  constructor(private courseService : CourseServiceService, private route: ActivatedRoute,private notificationService: NotificationService) { }





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
  ngOnInit(): void {
    this.idCourse = this.route.snapshot.params["id"];
    if (this.idCourse !== undefined) {
      console.log(this.idCourse)
      console.log(typeof(this.idCourse))
      this.courseService.getCourseDataById(this.idCourse).subscribe({
        next: (theCourse) => {
          if (Array.isArray(theCourse) && theCourse.length > 0) {
            this.theCourse = theCourse[0];
            this.triggerSuccess(`Le cours ${this.idCourse} a été récupéré avec succès !`);
          }
          else {
            this.theCourse = undefined;
            this.triggerError(`Le cours ${this.idCourse} n'existe pas !`);
          }

          console.log('Cours récupéré :', this.theCourse);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du cours:', err);
        }
      });
    }
  }
}
