import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Vérifiez l'état de connexion lors de l'initialisation
    this.authService.isLoggedIn.subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus; // Mettez à jour l'état
    });
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
}
