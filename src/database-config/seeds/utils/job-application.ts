import { SPACE_BETWEEN_ITEM } from 'src/shared/constants';
import { JobApplicationStatusEntity } from 'src/shared/entities/job-application-status.entity';
import { JobApplicationEntity } from 'src/shared/entities/job-application.entity';
import { JobPostEntity } from 'src/shared/entities/job-post.entity';
import { UserEntity } from 'src/shared/entities/user.entity';
import { EntityManager } from 'typeorm';

export async function jobApplicationsSeed(
  manager: EntityManager,
  user: UserEntity,
  status: JobApplicationStatusEntity[],
  jobPosts: JobPostEntity[],
): Promise<JobApplicationEntity[]> {
  const repo = manager.getRepository<JobApplicationEntity>(JobApplicationEntity);
  const seeds = [
    {
      position: SPACE_BETWEEN_ITEM,
      status: status[0],
      jobPost: jobPosts[0],
      user,
    },
    {
      position: 2 * SPACE_BETWEEN_ITEM,
      status: status[0],
      jobPost: jobPosts[1],
      user,
    },
    {
      position: 3 * SPACE_BETWEEN_ITEM,
      status: status[0],
      jobPost: jobPosts[2],
      user,
    },
    {
      position: SPACE_BETWEEN_ITEM,
      status: status[1],
      jobPost: jobPosts[3],
      user,
    },
    {
      position: 2 * SPACE_BETWEEN_ITEM,
      status: status[1],
      jobPost: jobPosts[4],
      user,
    },
  ];

  const data = seeds.map(seed => repo.create(seed));
  return repo.save(data);
}
