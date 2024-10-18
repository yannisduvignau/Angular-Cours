import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationService } from './services/notification/notification.service';
import { NgIf } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoursesComponent, NavbarComponent, NgbModule, NgIf, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projet_Bachelor';

  showToast = false;
  showProgressBar = false;
  toastHeader = '';
  toastMessage = '';
  progress = 0;
  interval: any;

  // Définir la durée du toast en millisecondes
  toastDuration = 4000; // 4 secondes

  constructor(private notificationService: NotificationService) {
    this.notificationService.setAppComponent(this);
  }

  triggerToast(header: string, message: string) {
    this.toastHeader = header;
    this.toastMessage = message;
    this.showToast = true;
    this.showProgressBar = true;
    this.startProgress();

    // Cacher le toast après la durée définie
    setTimeout(() => {
      this.showToast = false;
      this.resetProgress();
    }, this.toastDuration);
  }

  onToastHidden() {
    this.showToast = false;
    this.resetProgress();
  }

  startProgress() {
    this.progress = 0;
    const increment = 100 / (this.toastDuration / 100);

    this.interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += increment;
      } else {
        clearInterval(this.interval);
        this.showProgressBar = false;
      }
    }, 100);
  }

  resetProgress() {
    clearInterval(this.interval);
    this.progress = 0;
    this.showProgressBar = false;
  }
}
