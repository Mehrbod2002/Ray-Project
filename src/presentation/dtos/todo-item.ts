import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTodoItemDto {
    @IsNotEmpty()
    @IsString()
    todoListId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    priority?: number;
}

export class UpdateTodoItemDto {
    @IsNotEmpty()
    @IsString()
    todoListId: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    priority?: number;
}
