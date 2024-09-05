import { Component, Input } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlPipe } from '../../pipes/form-control.pipe';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.sass',
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() type: string = 'text';
  @Input() errorMessages: { [key: string]: string } = {};

  get formControl() {
    return this.formGroup.get(this.controlName) as FormControl;
  }

  hasError(error: string) {
    return this.formControl?.hasError(error) && this.formControl?.touched;
  }

  get errorKeys(): string[] {
    const control = this.formControl;
    if (control) {
      return Object.keys(this.errorMessages).filter((key) =>
        control.hasError(key),
      );
    }
    return [];
  }
}
