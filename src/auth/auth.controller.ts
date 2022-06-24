import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // intialize authService
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return 'signup';
  }

  @Post('signin')
  signin() {
    return 'sign in';
  }
}
