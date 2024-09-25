import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthSub implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: any = context.switchToHttp().getRequest();
    const userId = req.headers['user-id'];
    if (!userId)
      throw new BadRequestException('User ID not provided in headers');

    const user = this.usersService.findOne(Number(userId));
    if (!user) throw new UnauthorizedException();

    const dateToCheck = new Date(user.subsCription);
    const currentDate = new Date();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const isWithinOneMonth = dateToCheck > oneMonthAgo;

    req.discount = isWithinOneMonth;

    return true;
  }
}
