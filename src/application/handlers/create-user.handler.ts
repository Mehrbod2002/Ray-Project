import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(command: CreateUserCommand): Promise<User> {
        const { username, password } = command;
        const user: Partial<User> = {
            username,
            password,
        };
        user.username = username;
        user.password = password;
        return this.userRepository.create(user as User);
    }
}