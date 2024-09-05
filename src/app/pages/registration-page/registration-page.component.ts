import { CommonModule } from '@angular/common';
import { ApplicationModule, Component, inject } from '@angular/core';

import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';
import { Router } from '@angular/router';
import { ProfileMockService } from '../../data/services/profile-mock.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ALLOWED_CHARACTERS_PATTERN } from '../../shared/constants/allowed_characters_pattern';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ApplicationModule,
    CommonModule,
    FormFieldComponent,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.sass',
})
export class RegistrationPageComponent {
  profileService = inject(ProfileMockService);
  router = inject(Router);

  registerForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(ALLOWED_CHARACTERS_PATTERN),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(ALLOWED_CHARACTERS_PATTERN),
          ],
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const form = control as FormGroup;
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  onSubmit(event: Event) {
    if (this.registerForm.valid) {
      const newProfile: Profile = {
        id: Math.ceil(Math.random() * 10000),
        firstName: this.registerForm.get('firstName')?.value || '',
        lastName: this.registerForm.get('lastName')?.value || '',
        address: this.registerForm.get('address')?.value || '',
        email: this.registerForm.get('email')?.value || '',
        password: this.registerForm.get('password')?.value || '',
        token: Math.ceil(Math.random() * 10000).toString(),
      };

      this.profileService.createAccount(newProfile);

      console.log('created new account');

      this.router.navigate(['/profile']);
    } else {
      alert('Произошла ошибка, попробуйте снова');
    }
  }
}
