import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateTodoListCommand } from '../../application/commands/create-todo-list.command';
import { GetTodoListsQuery } from '../../application/queries/get-todo-lists.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListDto, UpdateTodoListDto } from '../dtos/todo-list.dto';
import { DeleteTodoListCommand } from 'src/application/commands/delete-todo-list.command';
import { UpdateTodoListCommand } from 'src/application/commands/update-todo-list.command';
import { Types } from 'mongoose';

@Controller('todo-lists')
export class TodoListsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    async create(@Body() createTodoListDto: CreateTodoListDto) {
        const command = new CreateTodoListCommand(createTodoListDto.userID, createTodoListDto.title);
        return this.commandBus.execute(command);
    }

    @Get(':userId')
    async findAll(@Param('userId') userId: string) {
        const query = new GetTodoListsQuery(userId);
        return this.queryBus.execute(query);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTodoListDto: UpdateTodoListDto) {
        const command = new UpdateTodoListCommand(new Types.ObjectId(id), updateTodoListDto.title);
        return this.commandBus.execute(command);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const command = new DeleteTodoListCommand(new Types.ObjectId(id));
        return this.commandBus.execute(command);
    }
}
