import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CategoriesComponent } from '../categories/categories.component';
import { CategoryServiceService } from '../services/category/category-service.service';
import { Category } from '../model/category';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf,CategoriesComponent,NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  categoriesData!: Category[];

  constructor(private authService: AuthService, private categoryService: CategoryServiceService ) {}

  ngOnInit() {
    // Vérifiez l'état de connexion lors de l'initialisation
    this.authService.isLoggedIn.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus; // Mettez à jour l'état
    });

    this.loadCategories();
  }



  /**
   *
   *
   * @return void
   */
  logout() {
    this.authService.logout();
    this.isLoggedIn = false; // Mettez à jour l'état de connexion après déconnexion
  }



  /**
   *
   *
   *
   */
  loadCategories(): void {
    this.categoryService.getCategoriesData().subscribe(
      (data: Category[]) => {
        this.categoriesData = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    )
  };
}
