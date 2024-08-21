import { Schema } from 'mongoose';

export const TodoListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  todoItems: [{ type: Schema.Types.ObjectId, ref: 'TodoItem' }],
});
