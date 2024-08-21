import { Schema } from 'mongoose';

export const TodoItemSchema = new Schema({
    todoListId: { type: Schema.Types.ObjectId, ref: 'TodoList', required: true },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: Number, required: true },
});