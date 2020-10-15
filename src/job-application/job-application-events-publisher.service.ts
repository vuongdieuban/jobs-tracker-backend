import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { ApplicationEventName } from './constants/application-event-name.enum';
import { ApplicationEvent } from './dto/websocket-response/application-event.type';
import { ApplicationCreatedEvent } from './dto/websocket-response/created-event.dto';
import { ApplicationReorderedEvent } from './dto/websocket-response/reordered-event.dto';
import { ApplicationStatusChangedEvent } from './dto/websocket-response/status-changed-event.dto';
import { JobApplicationEntity } from './entities/job-application.entity';

@Injectable()
export class JobApplicationEventsPublisher {
  private readonly source = new Subject<ApplicationEvent>();

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
        position: application.statusDisplayPosition,
        jobPost: application.jobPost
      }
    };
    this.publish(data);
  }

  public applicationStatusChanged(previousStatusId: string, application: JobApplicationEntity): void {
    const data: ApplicationStatusChangedEvent = {
      event: ApplicationEventName.STATUS_CHANGED,
      payload: {
        applicationId: application.id,
        userId: application.user.id,
        position: application.statusDisplayPosition,
        jobPost: application.jobPost,
        updatedStatusId: application.status.id,
        previousStatusId
      }
    };
    this.publish(data);
  }

  public applicationCreated(application: JobApplicationEntity): void {
    const data: ApplicationCreatedEvent = {
      event: ApplicationEventName.CREATED,
      payload: {
        applicationId: application.id,
        userId: application.user.id,
        position: application.statusDisplayPosition,
        statusId: application.status.id,
        jobPost: application.jobPost
      }
    };
    this.publish(data);
  }

  public applicationArchived(application: JobApplicationEntity): void {}

  private publish(data: ApplicationEvent): void {
    this.source.next(data);
  }
}