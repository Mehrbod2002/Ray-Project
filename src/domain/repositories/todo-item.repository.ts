import { TodoItem } from '../entities/todo-item.entity';

export interface TodoItemRepository {
    findById(id: string): Promise<TodoItem | null>;
    findByTodoListId(todoListId: string): Promise<TodoItem[]>;
    create(todoItem: TodoItem): Promise<TodoItem>;
    update(todoItem: TodoItem): Promise<TodoItem>;
    delete(id: string): Promise<void>;
}