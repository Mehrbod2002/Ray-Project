import { Document, Types } from 'mongoose';

export interface TodoItem extends Document {
    _id: Types.ObjectId;
    todoListId: Types.ObjectId;
    title: string;
    description?: string;
    priority: number;
}
