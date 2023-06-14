import { IsEnum, IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';

enum TYPES {
    Task = 'task',
    Reminder = 'reminder',
    Activity = 'activity'
}

enum STATUS {
    ToDo = 'to_do',
    InProgress = 'in_progress',
    Done = 'done'
}

export class CreateIssueDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsDate()
    @IsOptional()
    datetime: Date

    @IsString()
    @IsEnum(TYPES)
    @IsNotEmpty()
    type: string
    
    @IsString()
    @IsEnum(STATUS)
    @IsNotEmpty()
    status: string
}
