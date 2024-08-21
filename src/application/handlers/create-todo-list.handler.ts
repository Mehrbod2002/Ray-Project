import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';
import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { TodoList } from '../../domain/entities/todo-list.entity';

@Injectable()
@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
    constructor(private readonly todoListRepository: TodoListRepository) { }

    async execute(command: CreateTodoListCommand): Promise<TodoList> {
        const todoList = new TodoList();
        todoList.userId = command.userId;
        todoList.title = command.title;
        return this.todoListRepository.create(todoList);
    }
}