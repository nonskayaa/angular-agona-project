import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from './data/services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile } from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService
      .getTestAccounts()
      .subscribe((val) => (this.profiles = val));
  }
}
