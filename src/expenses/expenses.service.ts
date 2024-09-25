import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly usersService: UsersService) {}

  private expenses = [
    {
      id: 1,
      expense: 'car',
      amount: 2400,
    },
  ];

  create(createExpenseDto: CreateExpenseDto, request) {
    const UserId = request.userId;

    const user = this.usersService.findOne(Number(UserId));

    if (!user) throw new NotFoundException();

    const lastId = this.expenses[this.expenses.length - 1]?.id | 0;
    if (!createExpenseDto.expense || !createExpenseDto.amount)
      throw new BadRequestException();
    const newExpense = {
      id: lastId + 1,
      createdBy: user,
      ...createExpenseDto,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    return this.expenses.find((el) => el.id === id);
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException();
    const updatedExpense = {
      ...this.expenses[index],
      ...updateExpenseDto,
    };
    this.expenses[index] = updatedExpense;
    return updatedExpense;
  }

  remove(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException();
    const deletedExpense = this.expenses.splice(index, 1);
    return deletedExpense;
  }
}
