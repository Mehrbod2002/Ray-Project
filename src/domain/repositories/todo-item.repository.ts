import { TodoItem } from '../entities/todo-item.entity';

export interface TodoItemRepository {
    findById(todoListId: string, id: string): Promise<TodoItem | null>;
    findByTodoListId(todoListId: string): Promise<TodoItem[]>;
    create(todoListId: string, todoItem: TodoItem): Promise<TodoItem>;
    update(todoListId: string, todoItem: TodoItem): Promise<TodoItem | null>;
    delete(todoListId: string, id: string): Promise<void>;
}