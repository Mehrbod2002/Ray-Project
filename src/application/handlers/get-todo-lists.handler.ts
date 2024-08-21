import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodoListsQuery } from '../queries/get-todo-lists.query';
import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { TodoList } from '../../domain/entities/todo-list.entity';

@Injectable()
@QueryHandler(GetTodoListsQuery)
export class GetTodoListsHandler implements IQueryHandler<GetTodoListsQuery> {
    constructor(private readonly todoListRepository: TodoListRepository) { }

    async execute(query: GetTodoListsQuery): Promise<TodoList[]> {
        return this.todoListRepository.findAllByUserId(query.userId);
    }
}