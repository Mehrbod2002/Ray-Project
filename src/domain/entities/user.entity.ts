import { Document, Types } from 'mongoose';

export interface User extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    todoLists: Types.ObjectId[];
}
