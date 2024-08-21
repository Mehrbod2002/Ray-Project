import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UpdateUserCommand } from '../commands/update-user-command';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(command: UpdateUserCommand): Promise<User> {
        const { id, username, password } = command;
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error('User not found');

        if (username !== undefined) user.username = username;
        if (password !== undefined) user.password = password;

        return this.userRepository.update(user);
    }
}