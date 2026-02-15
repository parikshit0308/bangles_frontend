import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {}

  loginForm!: FormGroup;
  signupForm !: FormGroup
  loading = false;
  successMessage = '';
  errorMessage = '';
  isLoginMode = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

        this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

    onLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    this.api.post('auth/login', this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Login failed';
        }
      });
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:5000/api/auth/google';
  }

    switchMode(mode: boolean) {
    this.isLoginMode = mode;
    this.errorMessage = '';
    this.successMessage = '';
  }

    onSignup() {
    if (this.signupForm.invalid) return;

    this.loading = true;

    this.api.post('auth/signup', this.signupForm.value)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.successMessage = res.message;

          setTimeout(() => {
            this.switchMode(true);
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Signup failed';
        }
      });
  }
}
