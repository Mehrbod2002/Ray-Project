// src/application/handlers/create-todo-item.handler.ts

import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../commands/create-todo-item.command';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';
import { TodoItem } from '../../domain/entities/todo-item.entity';
import { Types } from 'mongoose';

@Injectable()
@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
    constructor(private readonly todoItemRepository: TodoItemRepository) { }

    async execute(command: CreateTodoItemCommand): Promise<TodoItem> {
        const todoItemData: Partial<TodoItem> = {
            todoListId: new Types.ObjectId(command.todoListId),
            title: command.title,
            description: command.description,
            priority: command.priority,
        };

        return this.todoItemRepository.create(command.todoListId, todoItemData as TodoItem);
    }
}
