import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form!: FormGroup;

  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['madie.snapfood@gmail.com', [Validators.required, Validators.email]],
      password: ['snapfood123', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir le formulaire correctement.';
      return;
    }

    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe(
      (ok) => {
        if (ok) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Identifiants invalides.';
        }
      },
      (err) => {
        console.error(err);
        this.errorMessage = "Erreur pendant l'authentification.";
      }
    );
  }
}
