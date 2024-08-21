
import { IsNotEmpty, IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 50)
    password: string;

    @IsOptional()
    @IsEmail()
    @IsString()
    email?: string;
}