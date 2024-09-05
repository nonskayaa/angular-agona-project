import { ApplicationModule, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { AuthMockService } from '../../data/services/auth-mock.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ApplicationModule,
    CommonModule,
    FormFieldComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.sass',
})
export class LoginPageComponent {
  authService = inject(AuthMockService);
  router = inject(Router);

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(event: Event) {
    if (this.loginForm.valid) {
      console.log(
        this.authService.login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value,
        ),
      );
      if (
        this.authService.login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value,
        )
      ) {
        console.log('yes');
        this.router.navigate(['/profile']);
      } else {
        alert('Неправильный пароль или почта');
      }
    }
  }
}
