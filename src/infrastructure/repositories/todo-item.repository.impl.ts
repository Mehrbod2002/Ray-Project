import { Injectable } from '@nestjs/common';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';
import { TodoItem } from '../../domain/entities/todo-item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodoItemRepositoryImpl implements TodoItemRepository {
    constructor(
        @InjectModel('TodoItem') private readonly todoItemModel: Model<TodoItem>,
    ) { }

    async findById(todoListId: string, id: string): Promise<TodoItem | null> {
        const todoListObjectId = new Types.ObjectId(todoListId);
        const todoItemObjectId = new Types.ObjectId(id);

        return this.todoItemModel
            .findOne({ _id: todoItemObjectId, todoListId: todoListObjectId })
            .exec();
    }

    async findByTodoListId(todoListId: string): Promise<TodoItem[]> {
        const todoListObjectId = new Types.ObjectId(todoListId);

        return this.todoItemModel.find({ todoListId: todoListObjectId }).exec();
    }

    async create(todoListId: string, todoItem: TodoItem): Promise<TodoItem> {
        const todoListObjectId = new Types.ObjectId(todoListId);

        const newTodoItem = new this.todoItemModel({
            ...todoItem,
            todoListId: todoListObjectId,
        });

        return newTodoItem.save();
    }

    async update(todoListId: string, todoItem: TodoItem): Promise<TodoItem | null> {
        const todoListObjectId = new Types.ObjectId(todoListId);

        return this.todoItemModel
            .findOneAndUpdate(
                { _id: todoItem._id, todoListId: todoListObjectId },
                todoItem,
                { new: true },
            )
            .exec();
    }

    async delete(todoListId: string, id: string): Promise<void> {
        const todoListObjectId = new Types.ObjectId(todoListId);
        const todoItemObjectId = new Types.ObjectId(id);

        await this.todoItemModel
            .findOneAndDelete({ _id: todoItemObjectId, todoListId: todoListObjectId })
            .exec();
    }
}