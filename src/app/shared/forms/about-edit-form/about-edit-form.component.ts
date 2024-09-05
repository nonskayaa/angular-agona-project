import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../ui/form-field/form-field.component';
import { FormFieldTextareaComponent } from '../../ui/form-field-textarea/form-field-textarea.component';
import { DialogRef } from '../../dialog/dialog-ref';
import { DIALOG_DATA } from '../../dialog/dialog-tokens';
import { ProfileMockService } from '../../../data/services/profile-mock.service';
import { Profile } from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-about-edit-form',
  standalone: true,
  imports: [FormFieldComponent, FormFieldTextareaComponent],
  templateUrl: './about-edit-form.component.html',
  styleUrl: './about-edit-form.component.sass',
})
export class AboutEditFormComponent {
  aboutEditForm: FormGroup;

  profileMockService = inject(ProfileMockService);

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string,
  ) {
    this.aboutEditForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      aboutInfo: ['', Validators.maxLength(300)],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const profile = this.profileMockService.getAccount();
    if (profile) {
      this.aboutEditForm.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        address: profile.address,
        email: profile.email,
        aboutInfo: profile.aboutInfo,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.aboutEditForm.valid) {
      const profile = this.aboutEditForm.value as Profile;
      this.profileMockService.editAccount(profile);
    } else {
      alert('Ошибка! Попробуйте еще раз');
    }
    this.close();
  }
}
