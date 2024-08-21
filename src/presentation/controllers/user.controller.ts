import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { GetUserQuery } from '../../application/queries/get-user.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/application/commands/create-user.command';
import { UpdateUserCommand } from 'src/application/commands/update-user-command';
import { DeleteUserCommand } from 'src/application/commands/delete-user-command';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const command = new CreateUserCommand(createUserDto.username, createUserDto.password);
        return this.commandBus.execute(command);
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        const query = new GetUserQuery(id);
        return this.queryBus.execute(query);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const command = new UpdateUserCommand(id, updateUserDto.username, updateUserDto.password);
        return this.commandBus.execute(command);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const command = new DeleteUserCommand(id);
        return this.commandBus.execute(command);
    }
}