import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Category } from '../model/category';
import { CategoryServiceService } from '../services/category/category-service.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() Category!: Category;
  theCategory!: Category | undefined;
  idCategory!: number;

  constructor(private categoryService : CategoryServiceService, private route: ActivatedRoute,private notificationService: NotificationService) { }



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
    // this.lastNb = this.Category.nbEtud;

    this.idCategory = this.route.snapshot.params["id"];
    if (this.idCategory !== undefined) {
      this.categoryService.getCategoryDataById(this.idCategory).subscribe({
        next: (theCategory) => {
          if (Array.isArray(theCategory) && theCategory.length > 0) {
            this.theCategory = theCategory[0];
            this.triggerSuccess(`Le cours ${this.idCategory} a été récupéré avec succès !`);
          }
          else {
            this.theCategory = undefined;
            this.triggerError(`Le cours ${this.idCategory} n'existe pas !`);
          }

        },
        error: (err) => {
          console.error('Erreur lors de la récupération du cours:', err);
        }
      });
    }
  }
}
