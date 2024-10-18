import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validUsername = 'admin';
  private validPassword = 'password';
  private tokenKey = 'auth_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private notificationService: NotificationService) {}




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
  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      const token = 'fake-jwt-token'; // Simule un token JWT
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.tokenKey, token); // Stocke le token dans le local storage
      }
      this.isLoggedInSubject.next(true); // Émet l'état de connexion
      this.triggerSuccess("Connecté avec succès")
      return true;
    }
    this.triggerError("Erreur lors de l'authentification")
    return false;
  }



  /**
   *
   *
   * @return void
   */
  logout() {
    this.triggerSuccess("Déconnecté avec succès");
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
    this.isLoggedInSubject.next(false);
  }



  /**
   *
   *
   * @return void
   */
  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable(); // Expose un Observable
  }



  /**
   *
   *
   * @return void
   */
  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && localStorage.getItem(this.tokenKey) !== null; // Vérifie la présence du token
  }



  /**
   *
   *
   * @return void
   */
  getCurrentUser(): string | null {
    return this.isAuthenticated() ? this.validUsername : null;
  }
}
