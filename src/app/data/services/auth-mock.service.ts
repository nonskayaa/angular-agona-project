import { Injectable, inject } from '@angular/core';
import { ProfileMockService } from './profile-mock.service';
import { profileMockDefaultStorage } from '../profiles-mock-default-storage';
import { Profile } from '../interfaces/profile.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService {
  profilesData = inject(ProfileMockService);
  router = inject(Router);

  get isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string): boolean {
    const jsonData: string = localStorage.getItem('users')
      ? localStorage.getItem('users')!
      : profileMockDefaultStorage;
    const profilesMockStorage = JSON.parse(jsonData) as Profile[];
    const profile = profilesMockStorage.find(
      (profile) => profile.email === email
    );
    if (!profile || profile.password !== password) {
      return false;
    }

    localStorage.setItem('token', profile.token);
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
