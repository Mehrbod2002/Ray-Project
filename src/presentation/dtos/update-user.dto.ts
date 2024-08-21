import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(3, 20)
    username?: string;

    @IsOptional()
    @IsString()
    @Length(6, 50)
    password?: string;

    @IsOptional()
    @IsEmail()
    @IsString()
    email?: string;
}