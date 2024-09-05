import { Component, Input, inject, signal } from '@angular/core';
import { AboutEditFormComponent } from '../../../shared/forms/about-edit-form/about-edit-form.component';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ProfileMockService } from '../../../data/services/profile-mock.service';
import { SkeletonComponent } from '../../../shared/ui/skeleton/skeleton.component';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [SkeletonComponent, LoaderComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.sass',
})
export class ProfileHeaderComponent {
  @Input() profile: Profile = {} as Profile;
  loading = signal(false);

  profileMockService = inject(ProfileMockService);

  constructor(private dialog: DialogService) {}

  openAboutEditForm() {
    const dialogRef = this.dialog.open(AboutEditFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loading.set(true);

      this.profile = this.profileMockService.getAccount();

      setTimeout(() => {
        this.loading.set(false);
      }, 2000);
    });
  }
}
