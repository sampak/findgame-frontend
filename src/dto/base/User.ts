export interface User {
  id: string;
  email: string;
  login: string;
  avatar: string;
  location: string;
  steamId: string | null;
  score: number;
}
