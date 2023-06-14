import { IsOptional, IsDateString, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaginationQueryDto } from 'src/paginate/pagination-query.dto';
import { IsOnlyDate } from 'src/utils';

export class GetIssueFilterDto extends PartialType(PaginationQueryDto) {

    @IsOptional()
    status: string;

    @IsOptional()
    type: string;

    @IsOptional()
    @IsOnlyDate()
    date_from: string;

    @IsOptional()
    @IsOnlyDate()
    date_to: string;

}
