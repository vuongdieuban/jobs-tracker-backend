import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { ApplicationEventName } from '.';
import { ApplicationEvent } from '../dto/websocket-response/application-event.type';
import { ApplicationCreatedEvent } from '../dto/websocket-response/created-event.dto';
import { ApplicationReorderedEvent } from '../dto/websocket-response/reordered-event.dto';
import { ApplicationStatusChangedEvent } from '../dto/websocket-response/status-changed-event.dto';
import { JobApplicationEntity } from '../entities/job-application.entity';
import { JobApplicationSubscriber } from './job-application.subscriber';

@Injectable()
export class JobApplicationPublisher {
  private readonly source = new Subject<ApplicationEvent>();

  constructor(private readonly subscriber: JobApplicationSubscriber) {
    this.subscriber.data$.subscribe(data => {
      console.log('Listen data from Publisher', data);
    });
  }

  get data$() {
    return this.source.asObservable();
  }

  public applicationReordered(application: JobApplicationEntity): void {
    const data: ApplicationReorderedEvent = {
      event: ApplicationEventName.REORDERED,
      payload: {
        applicationId: application.id,
        userId: application.user.id,
        statusId: application.status.id,
        position: application.position,
        jobPost: application.jobPost,
      },
    };
    this.publish(data);
  }

  public applicationStatusChanged(previousStatusId: string, application: JobApplicationEntity): void {
    const data: ApplicationStatusChangedEvent = {
      event: ApplicationEventName.STATUS_CHANGED,
      payload: {
        applicationId: application.id,
        userId: application.user.id,
        position: application.position,
        jobPost: application.jobPost,
        updatedStatusId: application.status.id,
        previousStatusId,
      },
    };
    this.publish(data);
  }

  public applicationCreated(application: JobApplicationEntity): void {
    const data: ApplicationCreatedEvent = {
      event: ApplicationEventName.CREATED,
      payload: {
        applicationId: application.id,
        userId: application.user.id,
        position: application.position,
        statusId: application.status.id,
        jobPost: application.jobPost,
      },
    };
    this.publish(data);
  }

  public applicationArchived(application: JobApplicationEntity): void {
    console.log('archived', application);
    return;
  }

  private publish(data: ApplicationEvent): void {
    this.source.next(data);
  }
}
