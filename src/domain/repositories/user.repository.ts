import { User } from '../entities/user.entity';

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findAllByUserId(): Promise<User[]>
    create(user: User): Promise<User>;
    update(user: User): Promise<User | null>;
    delete(id: string): Promise<void>;
}