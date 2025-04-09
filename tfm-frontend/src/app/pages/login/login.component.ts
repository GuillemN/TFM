import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showPassword = false;



  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = "T'has registrat correctament!";
      }
    });
  }

  onSubmit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.errorMessage = null;
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Error de login', err);
        this.errorMessage = 'Credencials incorrectes. Torna-ho a intentar.';
      }
    });
  }
}
