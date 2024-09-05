import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-form-field-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextFieldModule],
  templateUrl: './form-field-textarea.component.html',
  styleUrl: './form-field-textarea.component.sass',
})
export class FormFieldTextareaComponent {
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
