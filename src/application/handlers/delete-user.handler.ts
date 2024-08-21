import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { DeleteUserCommand } from '../commands/delete-user-command';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(command: DeleteUserCommand): Promise<void> {
        const { id } = command;
        await this.userRepository.delete(id);
    }
}