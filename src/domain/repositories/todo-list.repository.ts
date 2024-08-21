import { TodoList } from '../entities/todo-list.entity';

export interface TodoListRepository {
    findById(userID: string, id: string): Promise<TodoList | null>;
    create(userId: string, todoListData: Partial<TodoList>): Promise<TodoList>;
    update(userID: string, todoList: TodoList): Promise<TodoList | null>;
    delete(id: string): Promise<void>;
    findAllByUserId(userID: string): Promise<TodoList[]>;
}