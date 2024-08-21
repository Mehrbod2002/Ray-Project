
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoListDto {
    @IsNotEmpty()
    @IsString()
    userID: string;

    @IsNotEmpty()
    @IsString()
    title: string;
}

export class UpdateTodoListDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsNotEmpty()
    @IsString()
    userID: string;
}