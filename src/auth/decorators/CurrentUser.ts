import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../types/UserPayload';

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);

/*  @CurrentUser() currentUser: UserPayload) {
    if (createPostDto.authorId !== currentUser.sub) {
      throw new UnauthorizedException('Só é possível criar posts para si mesmo');
    } */