import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobApplicationStatusEntity } from './entities/job-application-status.entity';
import { JobApplicationStatusService } from './job-application-status.service';

@Controller('job-application-status')
@ApiTags('platform')
export class JobApplicationStatusController {
  constructor(private readonly applicationStatusService: JobApplicationStatusService) {}

  @Get('/')
  public async findAll(): Promise<JobApplicationStatusEntity[]> {
    return this.applicationStatusService.findAll();
  }
}