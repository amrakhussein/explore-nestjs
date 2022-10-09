import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  // intialize authService
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupAuthDto: AuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() signinAuthDto: AuthDto) {
    return this.authService.signIn(signinAuthDto);
  }
}
