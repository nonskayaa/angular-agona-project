import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { canActivateAuthMock } from './data/guards/access-mock.guard';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [canActivateAuthMock],
  },
];
