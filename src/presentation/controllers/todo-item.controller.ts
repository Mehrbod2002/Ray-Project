import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { UpdateTodoItemCommand } from '../../application/commands/update-todo-item.command';
import { DeleteTodoItemCommand } from '../../application/commands/delete-todo-item.command';
import { GetTodoItemsQuery } from '../../application/queries/get-todo-items.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoItemDto, UpdateTodoItemDto } from '../dtos/todo-item';
import { CreateTodoItemCommand } from 'src/application/commands/create-todo-item.command';

@Controller('todo-items')
export class TodoItemsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    async create(@Body() createTodoItemDto: CreateTodoItemDto) {
        const command = new CreateTodoItemCommand(createTodoItemDto.todoListId, createTodoItemDto.title, createTodoItemDto.description, createTodoItemDto.priority);
        return this.commandBus.execute(command);
    }

    @Get(':todoListId')
    async findAll(@Param('todoListId') todoListId: string) {
        const query = new GetTodoItemsQuery(todoListId);
        return this.queryBus.execute(query);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTodoItemDto: UpdateTodoItemDto) {
        const command = new UpdateTodoItemCommand(id, updateTodoItemDto.title, updateTodoItemDto.description, updateTodoItemDto.priority, updateTodoItemDto.todoListId);
        return this.commandBus.execute(command);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Query("todolistid") todoList: string) {
        const command = new DeleteTodoItemCommand(id, todoList);
        return this.commandBus.execute(command);
    }
}
