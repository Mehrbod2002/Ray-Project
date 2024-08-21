import { Injectable } from '@nestjs/common';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';
import { TodoItem } from '../../domain/entities/todo-item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoItemRepositoryImpl implements TodoItemRepository {
    constructor(@InjectModel('TodoItem') private readonly todoItemModel: Model<TodoItem>) { }

    async findById(id: string): Promise<TodoItem | null> {
        return this.todoItemModel.findById(id).exec();
    }

    async findByTodoListId(todoListId: string): Promise<TodoItem[]> {
        return this.todoItemModel.find({ todoListId }).exec();
    }

    async create(todoItem: TodoItem): Promise<TodoItem> {
        return new this.todoItemModel(todoItem).save();
    }

    async update(todoItem: TodoItem): Promise<TodoItem> {
        return this.todoItemModel.findByIdAndUpdate(todoItem._id, todoItem, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.todoItemModel.findByIdAndDelete(id).exec();
    }
}