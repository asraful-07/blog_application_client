export interface User {
  id: string | number;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string;
  phone: string;
  status: string;
}
