import { Controller, Get, Post, Body,Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/RequestLogin';
import { Public } from './decorators/isPublic.decorator';
import { AuthGuard } from './guards/auth-guard';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() LoginRequestBody : LoginRequestBody){
    return this.authService.login(LoginRequestBody)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  
}
