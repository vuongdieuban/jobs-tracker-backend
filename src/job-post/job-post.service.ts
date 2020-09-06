import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPostDto } from './dto/job-post.dto';
import { JobPostEntity } from './entities/job-post.entity';
import { JobPostStateService } from './job-post-state.service';

@Injectable()
export class JobPostService {
  constructor(
    @InjectRepository(JobPostEntity)
    private readonly jobPostRepository: Repository<JobPostEntity>
  ) {}

  findAll(): Promise<JobPostEntity[]> {
    return this.jobPostRepository.find();
  }

  findOne(id: string): Promise<JobPostEntity> {
    return this.jobPostRepository.findOne(id);
  }

  async create(jobPost: JobPostDto): Promise<JobPostEntity> {
    const createdJobPost = this.jobPostRepository.create(jobPost);
    await createdJobPost.save();
    return createdJobPost;
  }
}
