import { Component, Input, computed, signal, inject } from '@angular/core';
import { NoDataComponent } from '../../../shared/ui/no-data/no-data.component';
import { AboutEditFormComponent } from '../../../shared/forms/about-edit-form/about-edit-form.component';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { ProfileMockService } from '../../../data/services/profile-mock.service';
import { SkeletonComponent } from '../../../shared/ui/skeleton/skeleton.component';

@Component({
  selector: 'app-bio-about-block',
  standalone: true,
  imports: [NoDataComponent, AboutEditFormComponent, SkeletonComponent],
  templateUrl: './bio-about-block.component.html',
  styleUrls: ['./bio-about-block.component.sass'],
})
export class BioAboutBlockComponent {
  @Input() aboutInfo: string | undefined;

  profileMockService = inject(ProfileMockService);
  dialogService = inject(DialogService);

  loading = signal(false);

  constructor() {
    console.log(this.aboutInfo);
  }

  openAboutEditForm() {
    const dialogRef = this.dialogService.open(AboutEditFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.loading.set(true);
      this.aboutInfo = this.profileMockService.getAccount().aboutInfo;

      setTimeout(() => {
        this.loading.set(false);
      }, 2000);
    });
  }
}
