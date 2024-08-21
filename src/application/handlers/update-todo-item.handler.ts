import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';
import { TodoItem } from '../../domain/entities/todo-item.entity';

@Injectable()
@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
    constructor(private readonly todoItemRepository: TodoItemRepository) { }

    async execute(command: UpdateTodoItemCommand): Promise<TodoItem> {
        const todoItem = await this.todoItemRepository.findById(command.id);
        if (!todoItem) throw new Error('TodoItem not found');

        if (command.title !== undefined) todoItem.title = command.title;
        if (command.description !== undefined) todoItem.description = command.description;
        if (command.priority !== undefined) todoItem.priority = command.priority;

        return this.todoItemRepository.update(todoItem);
    }
}
