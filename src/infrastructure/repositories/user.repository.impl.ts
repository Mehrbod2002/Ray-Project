import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    private readonly saltRounds = 10;

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findAllByUserId(): Promise<User[]> {
        return this.userModel.find({}).exec();
    }

    async findById(id: string): Promise<User | null> {
        const userObjectId = new Types.ObjectId(id);
        return this.userModel.findById(userObjectId).exec();
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }

    async create(user: User): Promise<User> {
        const hashedPassword = await hash(user.password, this.saltRounds);
        const newUser = new this.userModel({
            ...user,
            password: hashedPassword,
        });
        return newUser.save();
    }

    async update(user: User): Promise<User | null> {
        const userObjectId = new Types.ObjectId(user._id);
        return this.userModel
            .findByIdAndUpdate(userObjectId, user, { new: true })
            .exec();
    }

    async delete(id: string): Promise<void> {
        const userObjectId = new Types.ObjectId(id);
        await this.userModel.findByIdAndDelete(userObjectId).exec();
    }
}