import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateTodoItemHandler } from './application/handlers/create-todo-item.handler';
import { TodoItemRepository } from './domain/repositories/todo-item.repository';
import { CreateTodoItemCommand } from './application/commands/create-todo-item.command';

describe('CreateTodoItemHandler', () => {
  let handler: CreateTodoItemHandler;
  let todoItemRepository: TodoItemRepository;

  const mockTodoItemRepository = {
    create: jest.fn().mockResolvedValue({
      _id: new Types.ObjectId(),
      todoListId: new Types.ObjectId(),
      title: 'Test Item',
      description: 'Test Description',
      priority: 1,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTodoItemHandler,
        { provide: 'TodoItemRepository', useValue: mockTodoItemRepository },
      ],
    }).compile();

    handler = module.get<CreateTodoItemHandler>(CreateTodoItemHandler);
    todoItemRepository = module.get<TodoItemRepository>('TodoItemRepository');
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create a new todo item', async () => {
    const command = new CreateTodoItemCommand(
      new Types.ObjectId().toString(),
      'Test Item',
      'Test Description',
      1,
    );

    const result = await handler.execute(command);

    expect(todoItemRepository.create).toHaveBeenCalledWith(
      command.todoListId,
      expect.objectContaining({
        title: command.title,
        description: command.description,
        priority: command.priority,
      }),
    );
    expect(result).toEqual({
      _id: expect.any(Types.ObjectId),
      todoListId: command.todoListId,
      title: command.title,
      description: command.description,
      priority: command.priority,
    });
  });
});
