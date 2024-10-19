import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../model/category';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryComponent } from '../category/category.component';
import { CategoryServiceService } from '../services/category/category-service.service';
import { CategoryVisibility } from '../enums/category-visibility';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ReactiveFormsModule,RouterLink,RouterLinkActive,NgxPaginationModule,CategoryComponent,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categoryVisibilityEnum = CategoryVisibility;

  /*----------------------------
          CONSTRUCTEUR
  ----------------------------*/

  constructor(
    private categoryService: CategoryServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  /*----------------------------
            VARIABLES
  ----------------------------*/

  title!: string;
  categories!: Category[];
  categoriesData!: Category[];

  idCategory!: string;
  theCategory!: Category | undefined;

  formulaire!: FormGroup;

  deleteForm!: FormGroup;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  /*----------------------------
            FONCTIONS
  ----------------------------*/





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
   *
   *
   *
   *
   */
  loadCategories(): void {
    this.categoryService.getCategoriesData().subscribe(
      (data: Category[]) => {
        this.categoriesData = data;
        this.totalPages = Math.ceil(this.categoriesData.length / this.itemsPerPage);
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
      categoryId: ['', [Validators.required]] // Validation requise pour l'ID
    });

    this.formulaire = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      visibility: ['', Validators.required],
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
  addNewCategory(): void {
    if (this.formulaire.valid) {
      this.categoryService.getLastCategoryId().subscribe(lastId => {
        let newCategory: Category = {
          id: lastId + 1,
          title: this.formulaire.get('title')?.value,
          description: this.formulaire.get('description')?.value,
          visibility: this.formulaire.get('visibility')?.value,
        };

        this.categoryService.addCategory(newCategory).subscribe({
          next: (category) => {
            this.categoriesData.push(category);
            this.triggerSuccess("Catégorie ajoutée avec succès !");
            this.loadCategories();
            this.formulaire.reset();
          },
          error: (err) => {
            console.log('Erreur lors de l\'ajout de la catégorie :' + err);
            //alert("Le cours n'a pas pu être ajouté.");
            this.triggerError("La catégorie n'a pas pu être ajoutée.");
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
  deleteCategory(): void {
    const categoryId = this.deleteForm.get('categoryId')?.value;

    if (categoryId) {
      console.log(categoryId)
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.loadCategories();
          this.deleteForm.reset();
          this.triggerError("Catégorie supprimée avec succès !");
        },
        error: (err) => {
          //console.log('Erreur lors de l\'ajout du cours :' + err);
          //alert("Le cours n'a pas pu être ajouté.");
          this.triggerError("La catégorie n'a pas pu être supprimée.");
        }
      });
    } else {
      this.triggerError('Veuillez sélectionner une catégorie valide.');
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
    this.title = "Liste de catégorie";

    this.loadCategories();

    this.initializeForms();
  }
}
