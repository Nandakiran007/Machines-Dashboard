import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = {
  id: number;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  private users: User[] = [
    { id: 1, email: 'admin@example.com', password: 'password123' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email && u.password === pass);
    return user ?? null;
  }

  async login(user: { id: number; email: string }) {
    const payload = { user: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
