import { PartialType } from '@nestjs/mapped-types';
import { LoginRequestBody } from './RequestLogin';

export class UpdateAuthDto extends PartialType(LoginRequestBody) {}
