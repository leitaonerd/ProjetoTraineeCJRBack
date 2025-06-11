import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginRequestBody } from './dto/RequestLogin';
import * as bcrypt from "bcrypt";
import { UserPayload } from './types/UserPayload';

@Injectable()
export class AuthService {
  constructor(private readonly userService:UsuarioService,private readonly jwtService : JwtService,private readonly configService : ConfigService){}

  async login(loginrequestBody : LoginRequestBody){ //valida o email e senha para ver se existem primeiramente, cria o corpo do token e depois cria o token
    const usuario = await this.validateUser(loginrequestBody.email,loginrequestBody.senha)

    if(!usuario){
      throw new UnauthorizedException("E-mail ou Senha inválidos")
    }

    const payload : UserPayload = { email: usuario.email, sub : usuario.id}
    const jwtToken = await this.jwtService.signAsync(payload,{expiresIn : '1d', secret : this.configService.get("JWT_SECRET")})
    return { acess_token : jwtToken}
  } 

  async validateUser(email : string, senha : string){ //valida o email e depois se a senha provida é compativel com a desse email
    const usuario = await this.userService.findByEmail(email)
    
    if(usuario){
      const validateSenha = await bcrypt.compare(senha, usuario.senha)
      if(validateSenha){
        return { ...usuario,senha:undefined}
      }
    }
    return null
  }
  
}
