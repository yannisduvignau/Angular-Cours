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



  /**
   *
   *
   *
   */
  onSearch(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Récupère la saisie utilisateur depuis l'input
    const inputElement = (event.target as HTMLElement).querySelector('input');
    const searchTerm = inputElement?.value;

    if (searchTerm) {
      // Force TypeScript à accepter window.find()
      const found = (window as any).find(searchTerm);

      if (!found) {
        console.log('Texte non trouvé sur la page.');
        alert(`Le texte "${searchTerm}" n'a pas été trouvé sur la page.`);
      }
    }
  }

}
