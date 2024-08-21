import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodoItemsQuery } from '../queries/get-todo-items.query';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';
import { TodoItem } from '../../domain/entities/todo-item.entity';

@Injectable()
@QueryHandler(GetTodoItemsQuery)
export class GetTodoItemsHandler implements IQueryHandler<GetTodoItemsQuery> {
    constructor(private readonly todoItemRepository: TodoItemRepository) { }

    async execute(query: GetTodoItemsQuery): Promise<TodoItem[]> {
        return this.todoItemRepository.findByTodoListId(query.todoListId);
    }
}