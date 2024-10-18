import { Injectable } from '@angular/core';
import { AppComponent } from '../../app.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private appComponent: AppComponent | undefined;

  setAppComponent(app: AppComponent) {
    this.appComponent = app;
  }

  showSuccess(message: string) {
    if (this.appComponent) {
      this.appComponent.triggerToast('Succès', message);
    } else {
      console.error('appComponent is not set. Cannot show toast.');
    }
  }

  showError(message: string) {
    if (this.appComponent) {
      this.appComponent.triggerToast('Erreur', message);
    } else {
      console.error('appComponent is not set. Cannot show toast.');
    }
  }
}
