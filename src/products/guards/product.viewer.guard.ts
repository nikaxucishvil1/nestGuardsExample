import { CanActivate, ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthViwer implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    if (!['admin', 'viewer'].includes(req.headers['role'] as string)) throw new UnauthorizedException()
      return true;
  }
}
