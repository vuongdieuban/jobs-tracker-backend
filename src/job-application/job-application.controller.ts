import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateApplicationRequestDto } from './dto/request/create-application-request.dto';
import { ReorderApplicationRequestDto } from './dto/request/reorder-application-request.dto';
import { ApplicationArchivedResponseDto } from './dto/response/application-archived-response.dto';
import { ApplicationUpdatedResponseDto } from './dto/response/application-updated-response.dto';
import { JobApplicationEntity } from './entities/job-application.entity';
import { JobApplicationService } from './job-application.service';

@Controller('job-application')
@ApiTags('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Get('/')
  public async findAll(): Promise<JobApplicationEntity[]> {
    return this.jobApplicationService.findAll();
  }

  @Post('/')
  public async create(@Body() payload: CreateApplicationRequestDto): Promise<JobApplicationEntity> {
    return this.jobApplicationService.create(payload);
  }

  @Put('/reorder/:id')
  public async reorder(
    @Param('id') id: string,
    @Body() payload: ReorderApplicationRequestDto
  ): Promise<ApplicationUpdatedResponseDto> {
    return this.jobApplicationService.reorder(id, payload);
  }

  @Put('/archive/:id')
  public async archive(@Param('id') id: string): Promise<ApplicationArchivedResponseDto> {
    return this.jobApplicationService.archive(id);
  }
}
