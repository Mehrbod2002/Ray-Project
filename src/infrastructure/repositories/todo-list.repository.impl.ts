import { Injectable } from '@nestjs/common';
import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { TodoList } from '../../domain/entities/todo-list.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoListRepositoryImpl implements TodoListRepository {
    constructor(@InjectModel('TodoList') private readonly todoListModel: Model<TodoList>) { }

    async findById(id: string): Promise<TodoList | null> {
        return this.todoListModel.findById(id).exec();
    }

    async findAllByUserId(userId: string): Promise<TodoList[]> {
        return this.todoListModel.find({ userId }).exec();
    }

    async create(todoList: TodoList): Promise<TodoList> {
        return new this.todoListModel(todoList).save();
    }

    async update(todoList: TodoList): Promise<TodoList> {
        return this.todoListModel.findByIdAndUpdate(todoList._id, todoList, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.todoListModel.findByIdAndDelete(id).exec();
    }
}
