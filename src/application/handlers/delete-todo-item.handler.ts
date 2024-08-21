import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';

@Injectable()
@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler implements ICommandHandler<DeleteTodoItemCommand> {
  constructor(private readonly todoItemRepository: TodoItemRepository) { }

  async execute(command: DeleteTodoItemCommand): Promise<void> {
    await this.todoItemRepository.delete(command.id);
  }
}