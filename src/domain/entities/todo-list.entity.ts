import { Document, Types } from 'mongoose';

export interface TodoList extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    title: string;
    todoItems: Types.ObjectId[];
}
