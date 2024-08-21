import { Injectable } from '@nestjs/common';
import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { TodoList } from '../../domain/entities/todo-list.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodoListRepositoryImpl implements TodoListRepository {
    constructor(
        @InjectModel('TodoList') private readonly todoListModel: Model<TodoList>,
    ) { }

    async findById(userID: string, id: string): Promise<TodoList | null> {
        const userObjectId = new Types.ObjectId(userID);
        const todoListObjectId = new Types.ObjectId(id);

        return this.todoListModel
            .findOne({ _id: todoListObjectId, userId: userObjectId })
            .exec();
    }

    async findAllByUserId(userID: string): Promise<TodoList[]> {
        const userObjectId = new Types.ObjectId(userID);

        return this.todoListModel.find({ userId: userObjectId }).exec();
    }

    async create(userID: string, todoList: TodoList): Promise<TodoList> {
        const userObjectId = new Types.ObjectId(userID);

        const newTodoList = new this.todoListModel({
            ...todoList,
            userId: userObjectId,
        });

        return newTodoList.save();
    }

    async update(userID: string, todoList: TodoList): Promise<TodoList | null> {
        const userObjectId = new Types.ObjectId(userID);

        return this.todoListModel
            .findOneAndUpdate(
                { _id: todoList._id, userId: userObjectId },
                todoList,
                { new: true },
            )
            .exec();
    }

    async delete(id: string): Promise<void> {
        const todoListObjectId = new Types.ObjectId(id);

        await this.todoListModel.findByIdAndDelete(todoListObjectId).exec();
    }
}
