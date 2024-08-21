import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';
import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { Types } from 'mongoose';
import { TodoList } from 'src/domain/entities/todo-list.entity';

@Injectable()
@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
    constructor(private readonly todoListRepository: TodoListRepository) {}

    async execute(command: CreateTodoListCommand): Promise<TodoList> {
        const todoListData: Partial<TodoList> = {
            userId: new Types.ObjectId(command.userId),
            title: command.title,
            todoItems: [],
        };

        return this.todoListRepository.create(command.userId, todoListData);
    }
}