import { Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { profileMockDefaultStorage } from '../profiles-mock-default-storage';

@Injectable({
  providedIn: 'root',
})
export class ProfileMockService {
  private getProfilesFromStorage(): Profile[] {
    const jsonData = localStorage.getItem('users') || profileMockDefaultStorage;
    return JSON.parse(jsonData) as Profile[];
  }

  private saveProfilesToStorage(profiles: Profile[]): void {
    localStorage.setItem('users', JSON.stringify(profiles));
  }

  private getCurrentUserToken(): string {
    return localStorage.getItem('token') || '10000';
  }

  createAccount(newProfile: Profile): void {
    const profiles = this.getProfilesFromStorage();
    profiles.push(newProfile);
    this.saveProfilesToStorage(profiles);
  }

  getAccount(): Profile {
    const profiles = this.getProfilesFromStorage();
    const token = this.getCurrentUserToken();
    return profiles.find((profile) => profile.token === token)!;
  }

  editAccount(updatedProfile: Profile): void {
    const profiles = this.getProfilesFromStorage();
    const currentUserId = this.getAccount()?.id;

    if (currentUserId !== undefined) {
      const index = profiles.findIndex(
        (profile) => profile.id === currentUserId,
      );
      if (index !== -1) {
        profiles[index] = { ...profiles[index], ...updatedProfile };
        this.saveProfilesToStorage(profiles);
      } else {
        alert('Профиль не найден');
      }
    } else {
      alert('Профиль не найден');
    }
  }
}
