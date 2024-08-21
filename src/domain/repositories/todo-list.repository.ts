import { TodoList } from '../entities/todo-list.entity';

export interface TodoListRepository {
    findById(id: string): Promise<TodoList | null>;
    create(todoList: TodoList): Promise<TodoList>;
    update(todoList: TodoList): Promise<TodoList>;
    delete(id: string): Promise<void>;
    findAllByUserId(userID: string): Promise<TodoList[]>;
}