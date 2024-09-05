import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { BioAboutBlockComponent } from './bio-about-block/bio-about-block.component';
import { ProfileMockService } from '../../data/services/profile-mock.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { AboutEditFormComponent } from '../../shared/forms/about-edit-form/about-edit-form.component';
import { AuthMockService } from '../../data/services/auth-mock.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    BioAboutBlockComponent,
    AboutEditFormComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.sass',
})
export class ProfilePageComponent {
  profileMockService = inject(ProfileMockService);
  authMockService = inject(AuthMockService);

  profile = this.profileMockService.getAccount();

  constructor(private dialog: DialogService) {}

  openAboutEditForm() {
    const dialogRef = this.dialog.open(AboutEditFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.profile = this.profileMockService.getAccount();
    });
  }
}
