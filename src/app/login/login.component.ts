import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }



  /**
   *
   *
   * @return void
   */
  onLogin() {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.router.navigate(['/admin/courses']);
    } else {
      this.loginError = true;
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
