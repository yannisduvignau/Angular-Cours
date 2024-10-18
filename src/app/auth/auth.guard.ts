import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // Accès autorisé
    } else {
      this.router.navigate(['/login']);  // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
      return false;
    }
  }
}
