
import { Repository, FindOperator, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Issue } from './entities/issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/paginate/pagination';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { GetIssueFilterDto } from './dto/get-issue-filter-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class IssuesService {
  constructor(@InjectRepository(Issue) private issueRepository: Repository<Issue>) { }

  create(createIssueDto: CreateIssueDto) {
    const newRecord = this.issueRepository.create(createIssueDto);
    return this.issueRepository.save(newRecord);
  }

  async findAll({ size, page, status, type, date_from, date_to }: GetIssueFilterDto) {
    type findOptions = {
      status? : string,
      type? : string,
      datetime? : FindOperator<Date>,
    }
    const findOptions: findOptions = { };

    if(status?.length) findOptions.status = status;
    if(type?.length) findOptions.type = type;
    if(date_from && date_to) {
      findOptions.datetime = Between(new Date(`${date_from} 00:00:00`), new Date(`${date_to} 23:59:59`));
    }

    if (page && size) {
      const [results, total] = await this.issueRepository.findAndCount({
        skip: (page - 1) * size, 
        take: size, 
        order: { id: 'DESC' },
        where: findOptions 
      });
      return new Pagination<Issue>({ results, total, page, size });
    } else {
      return this.issueRepository.find({ 
        order: { id: 'DESC' }, 
        where: findOptions
      });
    }
  }

  async findOne(id: number) {
    const foundRecord =  await this.issueRepository.findOne({ where: { id } });
    if (!foundRecord) {
      return new HttpException('Issue not found', HttpStatus.NOT_FOUND);
    }
    return foundRecord;
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    const foundRecord =  await this.issueRepository.findOne({ where: { id } });
    if (!foundRecord) {
      return new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    const updatedRecord = Object.assign(foundRecord, updateIssueDto);
    return this.issueRepository.save(updatedRecord);
  }

  async remove(id: number) {
    const result =  await this.issueRepository.softDelete({ id });
    if (result.affected === 0) {
      return new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
