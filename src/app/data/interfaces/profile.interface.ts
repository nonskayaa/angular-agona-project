export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  aboutInfo?: string;
  password: string;
  email: string;
  address: string;
  avatarUrl?: string;
  token: string;
}
